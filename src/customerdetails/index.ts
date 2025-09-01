import {
    Context,
    HttpMethod,
    HttpRequest,
    HttpResponse,
    HttpStatusCode
} from "azure-functions-ts-essentials";

const customersDB=require("./customers.json");

const getCustomerById = (customerid: any) => {
    
    const customer = customersDB.find((customer: { id: any; }) => {
        return customer.id === customerid;
    });

    return {
        status: HttpStatusCode.OK,
        body: customer
    }
}

const getAllCustomers = () => {
    return {
        status: HttpStatusCode.OK,
        body: customersDB
    }
}

const addNewCustomer = (newCustomer: any) => {
    customersDB.push(newCustomer);
    return {
        status: HttpStatusCode.Created,
        body: newCustomer
    }
}

export async function run(context: Context, req: HttpRequest): Promise<any> {
    let response: any;
    const customerid = req.params ? req.params.customerid : null;

    switch (req.method) {
        case HttpMethod.GET:
            response = customerid ? getCustomerById(customerid) : getAllCustomers();
            break;
        case HttpMethod.POST:
            response = addNewCustomer(req.body);
            break;
        default:
            response = {
                status: HttpStatusCode.BadRequest,
                body: "Method not allowed"
            };
            break;
    }

    response.headers = {
        "Content-Type": "application/json"
    };

    context.res = response; 
    Promise.resolve();
}