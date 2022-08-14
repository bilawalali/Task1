const axios = require("axios");

let getUrl = "http://ptsv2.com";
describe("Get Data", function () {
    let getResponse;
    it("valid response", async() => {
        getResponse = await axios.get(getUrl + "/t/fu807-1554722621/post").catch(function (error) {
            console.error(error);
        });
        console.info("Response Status Code: ", getResponse.status);
        console.info("Response Body: ", getResponse.data);
        expect(getResponse.status).toBe(200);
        expect(getResponse.data.username).toBe("automate");
        expect(getResponse.data.password).toBe("everything");
        expect(getResponse.data.targetUrl).toBeInstanceOf(String);
        expect(getResponse.data.targetUrl).toContain("http://");
    });
    it("should be 404 Not Found", async() => {
        getResponse = await axios.get(getUrl + "/test/t/fu807-1554722621/post", {
            validateStatus: false,
        }).catch(function (error) {
            console.error(error);
        });
        console.info("Response Status Code: ", getResponse.status);
        expect(getResponse.status).toBe(404);
    });
});
describe("Post the data", function () {
    let getResponse;
    let postResponse;
    it("should response with a valid feedback", async() => {
        getResponse = await axios.get(getUrl + "/t/fu807-1554722621/post").catch(function (error) {
            console.error(error);
        });
        const username = getResponse.data.username;
        const password = getResponse.data.password;
        const targetUrl = getResponse.data.targetUrl;
        postResponse = await axios.post(targetUrl, {}, {
            auth: {
                username: username,
                password: password,
            },
        });
        console.info("Response Status Code: ", postResponse.status);
        console.info("Response: ", postResponse.data);
        expect(postResponse.status).toBe(200);
        expect(postResponse.data.ip).toBeInstanceOf(String);
        expect(postResponse.data.ip).toContain(".");
        expect(postResponse.data.token).toBeInstanceOf(String);
    });
    it("should response with unauthorized access if invalid username", async() => {
        getResponse = await axios.get(getUrl + "/t/fu807-1554722621/post").catch(function (error) {
            console.error(error);
        });
        const username = "invalid username";
        const password = getResponse.data.password;
        const targetUrl = getResponse.data.targetUrl;
        postResponse = await axios.post(targetUrl, {}, {
            validateStatus: false,
            auth: {
                username: username,
                password: password,
            },
        });
        console.info("Response Status Code: ", postResponse.status);
        expect(postResponse.status).toBe(401);
    });
    it("should response with unauthorized access if the authentication is inputted with invalid password", async() => {
        getResponse = await axios.get(getUrl + "/t/fu807-1554722621/post").catch(function (error) {
            console.error(error);
        });
        const username = getResponse.data.username;
        const password = "invalid password";
        const targetUrl = getResponse.data.targetUrl;
        postResponse = await axios.post(targetUrl, {}, {
            validateStatus: false,
            auth: {
                username: username,
                password: password,
            },
        });
        console.info("Response Status Code: ", postResponse.status);
        expect(postResponse.status).toBe(401);
    });
    it("should response with resource not found", async() => {
        getResponse = await axios.get(getUrl + "/t/fu807-1554722621/post").catch(function (error) {
            console.error(error);
        });
        const username = getResponse.data.username;
        const password = getResponse.data.username;
        const targetUrl = getResponse.data.targetUrl + "/unrecognized-path";
        postResponse = await axios.post(targetUrl, {}, {
            validateStatus: false,
            auth: {
                username: username,
                password: password,
            },
        });
        console.info("Response Status Code: ", postResponse.status);
        expect(postResponse.status).toBe(404);
    });
});
