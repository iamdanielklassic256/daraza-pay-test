// Online Javascript Editor for free
// Write, Edit and Run your Javascript code using JS Online Compiler

console.log("Try programiz.pro");

function requestToPay() {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", "Api-Key PmU43Tvn.HUpZDJNUTQczIX4457In3wFDK6ngqiLi");
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    "method": 1,
    "amount": "500",
    "phone": "0772837541",
    "note": "Checkout"
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
  };

  fetch("https://daraza.net/api/request_to_pay/", requestOptions)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.text();
    })
    .then((result) => {
      console.log("Response from API:", result); // Logs the response
    })
    .catch((error) => {
      console.error("Error occurred:", error); // Logs any errors
    });
}

// Call the function
requestToPay();
