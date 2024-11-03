1. clone the project
2. run: npm install
3. install mongodb
4. run: npm run dev from the project route.
5. Instead of exposing 5 API for text analysis I exposed one api for content analysis.
6. We need to first signup with a testuser at localhost:3000/api/signup endpoint.
7. then we need to login at localhost:3000/api/login with the new user this will reply with a token
8. We need add that token at header with a header key : authorization and value: Bearer "Your token"
9. For analyzing a text please hit at localhost:3000/api/text end point this will reply with the total analysis of the text.
the body should be : {
    "content": "A quick brown fox jumps over the lazy dogs"
}
10. To retrieve a text there is a GET endpoint: localhost:3000/api/text/:id , you need to pass id of the created analysis.
11. No logger is added.
