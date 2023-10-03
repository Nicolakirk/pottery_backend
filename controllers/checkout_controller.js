const express = require("express");
const app = express();
const stripe = require("stripe")
("sk_test_51NwnyALSqeSGrFJiMVGidHVFXxvEQ6ARdL2PNpE0HaWRr0axWPw3DHRz6FEeiSG0vZrc1Frxk0VKpwErNInRtQWg00DOGSNqCf");
app.use(express.static("public"))

exports.getCheckout = async (req, res) =>{
    console.log(req.body)

    const items = req.body.items

    let lineItems = [];

    items.forEach((item)=>{
        lineItems.push(
            {
            price: item.id, 
            quantity:item.quantity
        }
        )
    });

    const session = await stripe.checkout.sessions.create({
        line_items: lineItems,
        mode:"payment",
        success_url: "http://localhost:3000/success",
        cancel_url: "http://localhost:3000/cancel"
    })
    res.send(JSON.stringify({
        url: session.url

    }));
    
}
app.listen(4000, () => console.log("listing port 400"))

