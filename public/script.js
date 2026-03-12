var typed = new Typed("#element", {
  strings: ["Web. Developer.", "Trader.", "Investor.", "Content Creator."],
  typeSpeed: 80,
  backSpeed: 40,
  loop: true,
});



const API = "http://localhost:5000/api";


async function buyCourse(courseId) {

    const response = await fetch('/api/payment/order', {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'x-auth-token': localStorage.getItem('token') 
        },
        body: JSON.stringify({ courseId })
    });
    const data = await response.json();

    const options = {
        "key": "rzp_test_SPgoXRYi5B7IqS", 
        "amount": data.order.amount,
        "currency": "INR",
        "name": "BR30TRADER",
        "description": "Course Purchase",
        "order_id": data.order.id,
        "handler": async function (response) {
            
            const res = await fetch('/api/payment/verify', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'x-auth-token': localStorage.getItem('token') },
                body: JSON.stringify({ ...response, courseId })
            });
            const result = await res.json();
            alert(result.msg); 
            window.location.href = "/my-courses.html"; 
        }
    };
    const rzp = new Razorpay(options);
    rzp.open();
}


