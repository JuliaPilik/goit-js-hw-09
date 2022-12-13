const formRef = document.querySelector('.form');

formRef.addEventListener("submit", onSubmitForm);

function onSubmitForm(event) {
  event.preventDefault();
   const {
    elements: { delay, step, amount }
   } = event.currentTarget;
  
   if (delay.value === "" || step.value === "" || amount.value==="") {
    return console.log("Please fill in all the fields!");
  }

  let delayPromise =Number(delay.value);
  for (let i = 1; i <= amount.value; i += 1) {
     
    createPromise(i, delayPromise)
      .then(result => console.log(result))
      .catch(error => console.log(error));
      delayPromise += Number(step.value);
   
}
 event.currentTarget.reset();
}
function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) {
        resolve(`✅ Fulfilled promise ${position} in ${delay}ms`);
      } else {
        reject(`❌ Rejected promise ${position} in ${delay}ms`);
      }
    }, delay);
  });
}
