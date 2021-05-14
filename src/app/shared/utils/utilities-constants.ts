export const MASK_OPTIONS: string[] = ['0.0.0.0', '128.0.0.0', '192.0.0.0', '224.0.0.0', '240.0.0.0', '248.0.0.0', '252.0.0.0', '254.0.0.0', '255.0.0.0', '255.128.0.0', '255.192.0.0', '255.224.0.0', '255.240.0.0', '255.248.0.0', '255.252.0.0', '255.254.0.0', '255.255.0.0', '255.255.128.0', '255.255.192.0', '255.255.224.0', '255.255.240.0', '255.255.248.0', '255.255.252.0', '255.255.254.0', '255.255.255.0', '255.255.255.128', '255.255.255.192', '255.255.255.224', '255.255.255.240', '255.255.255.248', '255.255.255.252', '255.255.255.254', '255.255.255.255'];
export const INTERFACE_OPTIONS: string[] = ['Home', 'Guest', 'VPN', 'Ethernet', 'ISP', 'Любой'];
export const IPV4_REGEX = /^(?:(?:\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.){3}(?:\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
export enum RESPONSE_CODE {
    // Error
    ERR_UNKNOWN = -1,               // unclassified error
    ERR_INVALID_JSON = -2,          // invalid JSON passed
    ERR_INVALID_METHOD = -3,        // unsupported HTTP method

    ERR_ROUTE_OBJECT_EXPECTED = 0,  // 'create/update route' methods expect Omit<Route, 'uuid'> payload
    ERR_INVALID_IPV4 = 1,           // invalid IPv4 passed as 'address', 'mask' or 'gateway'
    ERR_INVALID_NETMASK = 2,        // invalid netmask passed
    ERR_INVALID_SUBNET = 3,         // 'address' & 'mask' are not a subnet
    ERR_NOT_FOUND = 4,              // route not found
    ERR_DUPLICATE = 5,              // route already exists
    ERR_NO_DATA = 6,                // empty object passed to the 'update route' method
    ERR_UUID_ALREADY_SET = 7,       // 'uuid' passed to the'update route' method

    // Success
    ROUTE_CREATED = 100,            // route successfully created
    ROUTE_CHANGED = 101,            // route successfully updated
    ROUTE_DELETED = 102,            // route successfully deleted
    ROUTE_FOUND = 103,              // route with given UUID successfully found
    ROUTE_IS_VALID = 104,           // internal code
    ROUTE_LIST_EXISTS = 105,        // return code for 'get all routes' method

    IP_ROUTED = 200,                // some route for passed IP found
    IP_UNROUTED = 201,              // no route for passed IP found
}
