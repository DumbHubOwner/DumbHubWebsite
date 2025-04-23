// Store the key in the backend
fetch('/store-key', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    key: generatedKey,
    expiration: expirationDate.getTime(),
    userId: 'someUserId',
  }),
})
.then(response => response.json())
.then(data => {
  console.log('Key stored:', data);
})
.catch(error => console.error('Error storing key:', error));

// Validate the key by making a GET request to the backend
fetch(`/validate-key/someUserId/${key}`)
  .then(response => response.json())
  .then(data => {
    console.log('Key validation result:', data);
  })
  .catch(error => console.error('Error validating key:', error));
