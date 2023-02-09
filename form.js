var key = '';
var xhr = new XMLHttpRequest();
xhr.open("GET", "./key.txt", true);
xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
        key = xhr.responseText;
    }
};
xhr.send();

function validateContactForm() {
    var valid = true;
    $(".info").html("");
    $(".input-field").css('border', '#e0dfdf 1px solid');
    $("#contact-company-name").removeClass("error-field");
    $("#contact-product-name").removeClass("error-field");
    $("#contact-promo").removeClass("error-field");
    $("#contact-audience").removeClass("error-field");
    $("#contact-tone").removeClass("error-field");
    $("#contact-word").removeClass("error-field");

    var companyName = $("#contact-company-name").val();
    console.log(companyName);
    var productName = $("#contact-product-name").val();
    var promo = $("#contact-promo").val();
    var audience = $("#contact-audience").val();
    var tone = $("#contact-tone").val();
    var word = $("#contact-word").val();

    var selectElement = document.querySelector('#select');
    var output = selectElement.value;

    if (companyName == "") {
        $("#companyName-info").html("Required.");
        $("#contact-company-name").css('border', '#e66262 1px solid');
        $("#contact-company-name").addClass("error-field");
        valid = false;
    }
    if (productName == "") {
        $("#productName-info").html("Required.");
        $("#contact-product-name").css('border', '#e66262 1px solid');
        $("#contact-product-name").addClass("error-field");
        valid = false;
    }
    if (promo == "") {
        $("#promo-info").html("Required.");
        $("#contact-promo").css('border', '#e66262 1px solid');
        $("#contact-promo").addClass("error-field");
        valid = false;
    }
    if (audience == "") {
        $("#audience-info").html("Required.");
        $("#contact-audience").css('border', '#e66262 1px solid');
        $("#contact-audience").addClass("error-field");
        valid = false;
    }

    if (tone == "") {
        $("#tone-info").html("Required.");
        $("#contact-tone").css('border', '#e66262 1px solid');
        $("#contact-tone").addClass("error-field");
        valid = false;
    }
    if ($('input[name="contact-subject"]:checked').length == 0) {
        $("#subject-info").html("Required.");
        valid = false;
    }
    if (word == "") {
        $("#word-info").html("Required.");
        $("#contact-word").css('border', '#e66262 1px solid');
        $("#contact-word").addClass("error-field");
        valid = false;
    }

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



prompt=

Ignore All Previous instructions before this one.

You are an expert email writer.

You are using your two decades of experience in to create the content for a landing page that sells the following product: """${productName}"""

I have outlined what is will be needed to complete this landing page  in "Content Needed" Section below. I have created needs in the "Facts" below, as well, take inspiration from the content in "Research" section below.


Content Needed:
1. Headline option
2. Introduction
4. An Offer area
6. Closing section


Facts:
1. Please write +100 or -100 of the following word count: """${word}"""
2. Tone / Style you should write in: """${tone}"""
3. You are writing to the following audience. Do not mention the audience by name, just make the content compelling to them: """${audience}"""
4. Please use the following promotion within the content: """${promo}"""


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
