var key = '';
var xhr = new XMLHttpRequest();
xhr.open("GET", "./key.txt", true);
xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
        key = xhr.responseText;
    }
};
xhr.send();

function generateText() {
    var selectElement = document.querySelector('#select');
    var output = selectElement.value;
    var companyName = $("#contact-company-name").val();
    var productName = $("#contact-product-name").val();
    var promo = $("#contact-promo").val();
    var audience = $("#contact-audience").val();
    var tone = $("#contact-tone").val();
    var word = $("#contact-word").val();

    var url = "https://api.openai.com/v1/completions";

    var xhr = new XMLHttpRequest();
    xhr.open("POST", url);

    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader(
        "Authorization",
        `Bearer ${key}`
    );

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            console.log(xhr.status);
            console.log(xhr.responseText);
            let response = xhr.responseText;
            response = JSON.parse(response);

            console.log(response);

            document.getElementById("output").innerHTML =
                response["choices"][0]["text"];
        }
    };

    var data = JSON.stringify({
        prompt: `Generate text for ${output} with
        company name:"""${companyName}"""
        product name:"""${productName}"""
        promo:"""${promo}"""
        target audience:"""${audience}"""
        tone of article:"""${tone}"""
        words count:"""${word}"""`,
        max_tokens: word,
        n: 1,
        stop: "",
        temperature: 0.5,
    });

    xhr.send(data);
}


   prompt=`
        Generate text for ${output} with
        company name:"""${companyName}"""
        product name:"""${productName}"""
        promo:"""${promo}"""
        target audience:"""${audience}"""
        tone of article:"""${tone}"""
        words count:"""${word}"""


prompt = JSON.parse(JSON.stringify(prompt));



    var data = {
        model: "text-davinci-003",
        prompt: prompt,
        temperature: 0.7,
        max_tokens: 1300,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
    };

    data = JSON.stringify(data);

    xhr.send(data);



    return valid;
}




function text() {
    // console.log("hello")


}
