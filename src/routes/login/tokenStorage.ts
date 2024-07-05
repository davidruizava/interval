import { Tenant } from "./tenats";

let authorizationTokenBetMx : string;
let authorizationTokenBet4 : string;

export const setToken = (token : string, tenant : Tenant) => {
    switch (tenant) {
        case Tenant.BetMX:
            authorizationTokenBetMx = token;
            break;
        case Tenant.BetBr:
            authorizationTokenBet4 = token;
            break;
    }
};

export const getToken = (tenant : Tenant) => {
    switch (tenant) {
        case Tenant.BetMX:
            return authorizationTokenBetMx;
        case Tenant.BetBr:
            return authorizationTokenBet4;
    }
};