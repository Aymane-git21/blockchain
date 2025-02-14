async function generateKeyPair() {
    return await crypto.subtle.generateKey(
        {
            name: "ECDSA",
            namedCurve: "P-256"
        },
        true,
        ["sign", "verify"]
    );
}

async function signMessage(privateKey, message) {
    const enc = new TextEncoder();
    const encodedMessage = enc.encode(message);
    return await crypto.subtle.sign(
        {
            name: "ECDSA",
            hash: { name: "SHA-256" }
        },
        privateKey,
        encodedMessage
    );
}

async function encryptText() {
    const inputBox = document.getElementById('ecdsaInputBox');
    const outputText = document.getElementById('ecdsaOutputText');

    if (inputBox.value.trim() === "") {
        outputText.textContent = "Please enter some text!";
        outputText.style.color = "red";
    } else {
        outputText.textContent = "Encrypting...";
        outputText.style.color = "black";

        const { privateKey, publicKey } = await generateKeyPair();
        const signature = await signMessage(privateKey, inputBox.value);

        const signatureArray = Array.from(new Uint8Array(signature));
        const signatureHex = signatureArray.map(b => b.toString(16).padStart(2, '0')).join('');

        outputText.textContent = `Signature: ${signatureHex}`;
    }
}