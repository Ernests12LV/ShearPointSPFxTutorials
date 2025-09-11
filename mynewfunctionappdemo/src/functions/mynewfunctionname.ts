import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import * as path from "path";
import * as fs from "fs";

export async function myfunction(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    context.log(`Http function processed request for url "${request.url}"`);

    // Build path to customers.json (going up from functions folder to customerdetails)
    const filePath = path.join(__dirname, "..", "customerdetails", "customers.json");

    // Read and parse JSON
    const fileContents = fs.readFileSync(filePath, "utf-8");
    const customers = JSON.parse(fileContents);

    return {
        status: 200,
        jsonBody: customers
    };
};

app.http('myfunction', {
    methods: ['GET'],
    authLevel: 'anonymous',
    handler: myfunction
});
