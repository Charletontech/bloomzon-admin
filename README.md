# Express-api-bloomzon

project master repo: https://github.com/Bloomzon-internaltional/Bloomzon_Admin.git

# how to make request to the elite video url

// Create a new FormData object
const formData = new FormData();

// Append the file to the FormData object
const fileInput = document.querySelector('input[type="file"]'); // Assuming you're using an input for file upload
formData.append('file', fileInput.files[0]);

// Append JSON data to the FormData object
const jsonData = {
key1: 'value1',
key2: 'value2'
};
formData.append('data', JSON.stringify(jsonData));

// Send the FormData with fetch
fetch('http://localhost:3000/upload', {
method: 'POST',
body: formData
})
.then(response => response.json())
.then(data => {
console.log('Success:', data);
})
.catch(error => {
console.error('Error:', error);
});

