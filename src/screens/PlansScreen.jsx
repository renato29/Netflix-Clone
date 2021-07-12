import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { currentPlan, selectUser } from '../features/userSlices';
import db from '../firebase'
import './PlansScreen.css'
import { loadStripe } from "@stripe/stripe-js";

function PlansScreen() {
    const [products, setProducts] = useState([]);
    const user = useSelector(selectUser); //pegar o user do redux store.
    const [subscriptions, setSubscriptions] = useState(null);
    const dispatch = useDispatch();

    useEffect(() => {
         db.collection('customers')
        .doc(user.uid)
        .collection('subscriptions')
        .get()
        .then(querySnapshot => {
            querySnapshot.forEach(async subscriptions=>{
                setSubscriptions({
                    role:subscriptions.data().role,
                    current_period_end: subscriptions.data().current_period_end.seconds,
                    current_period_start: subscriptions.data().current_period_start.seconds,
                })
            })
        })
    },[user.uid])

    useEffect(() => {
        db.collection('products')
            .where('active', '==', true)
            .get().then(querySnapshot => {
                const products = {};
                querySnapshot.forEach( async productDoc => {
                    products[productDoc.id] = productDoc.data();
                    const priceSnap = await productDoc.ref.collection('prices').get();
                    priceSnap.docs.forEach(price => {
                        products[productDoc.id].prices = {
                            priceId: price.id,
                            priceData: price.data()
                        }
                    })
                });
                setProducts(products);
            })
    }, [])
    console.log(products);
    console.log(subscriptions);

    //function to do the checkout 
    //quando o user faz checkout,devo fazer um stripecheckout
        const loadCheckout = async(priceId) =>{
            const docRef = await db.collection('customers')
            .doc(user.uid)
            .collection('checkout_sessions')
            .add({
                price: priceId,
                success_url: window.location.origin,
                cancel_url: window.location.origin,
                
            })
            //entrando na colecao de user e pegando 1 id espeficifo e cria uma nova colecao com o pruduto escolhido
            docRef.onSnapshot( async(snap)=>{ 
                const {error,sessionId} = snap.data();
                if(error) {
                    //show error to customer and inspect your cloud Function logs in the Firebase console.
                    alert(`An error occured:${error.message}`)
                }
                if(sessionId) { 
                    //we have a sesion, now let's redirect to checkout, 
                    //init Stripe
                    const stripe = await loadStripe('pk_test_51J8UAEGRDnLOCvhAchmQFGn071WqFXrfA397fwIdgVDSmua16aWNhi2gdDoexCcG9pYXgpzEgREQrh614cZjcUsX00Yqr7qhIg');
                    stripe.redirectToCheckout({ sessionId })
                }
            })
        }

        

    return(
        <div className='plansScreen'>
        
        {subscriptions && <p>Renewal date: { new Date(subscriptions?.current_period_end * 1000).toLocaleDateString()}</p>} 
        
        {Object.entries(products).map(([productId, productData]) => {
            //  TODO add some logic to check user subscription is active
            const isCurrentPackage = productData.name?.toLowerCase().includes(subscriptions?.role)
            
            return ( 

                <div key={productId}
                    className={`${isCurrentPackage && "plansScreen__plan--disabled"} plansScreen__plan`}
                    >
          
                    <div className="plan sScreen_info">
                        <h5>{productData.name}</h5>
                        <h6>{productData.description}</h6>
                    </div>
                    

                    <button onClick={()=> 
                        !isCurrentPackage && loadCheckout(productData.prices.priceId)}>
                        {isCurrentPackage? "Current Package" : "Subscribe"}
                    </button>
                    
                </div>
          

            )

        }
        
        )
        
    }


    </div>)

}

export default PlansScreen
