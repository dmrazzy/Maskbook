// This file is generated by ./messages.txt with ../gen-message.mjs. DO NOT EDIT this file.
import { MaskEthereumProviderRpcError, type MaskEthereumProviderRpcErrorOptions } from './error.js'
// prettier-ignore
export function fromMessage(message: string, options?: MaskEthereumProviderRpcErrorOptions): MaskEthereumProviderRpcError | undefined
// prettier-ignore
export function fromMessage(message: ErrorMessages, options?: MaskEthereumProviderRpcErrorOptions): MaskEthereumProviderRpcError
// prettier-ignore
export function fromMessage(message: string | ErrorMessages, options: MaskEthereumProviderRpcErrorOptions = {}): MaskEthereumProviderRpcError | undefined {
    // prettier-ignore
    return message in codeMap ? new MaskEthereumProviderRpcError((codeMap as any)[message], message, options) : undefined
}
// prettier-ignore
export enum ErrorMessages {
    invalid_input = "Invalid input",
    resource_not_found = "Resource not found",
    resource_unavailable = "Resource unavailable",
    transaction_rejected = "Transaction rejected",
    method_not_supported = "Method not supported",
    limit_exceeded = "Limit exceeded",
    json_rpc_version_not_supported = "JSON-RPC version not supported",
    invalid_request = "Invalid request",
    the_method_eth_subscribe_is_only_available_on_the_mainnet = "The method \"eth_subscribe\" is only available on the mainnet.",
    invalid_address = "Invalid address",
    invalid_params = "Invalid params",
    wallet_request_permissions_a_permission_request_must_contain_at_least_1_permission = "A permission request must contain at least 1 permission.",
    wallet_watch_asset_a_symbol_is_required_but_was_not_found_in_either_the_request_or_contract = "A symbol is required, but was not found in either the request or contract",
    wallet_watch_asset_decimals_are_required_but_were_not_found_in_either_the_request_or_contract = "Decimals are required, but were not found in either the request or contract",
    wallet_watch_asset_the_token_address_seems_invalid = "The token address seems invalid",
    wallet_watch_asset_unable_to_verify_ownership_possibly_because_the_standard_is_not_supported_or_the_users_currently_selected_network_does_not_match_the_chain_of_the_asset_in_question = "Unable to verify ownership. Possibly because the standard is not supported or the user's currently selected network does not match the chain of the asset in question.",
    internal_error = "Internal error",
    parse_error = "Parse error",
    user_rejected_the_request = "User rejected the request",
    the_requested_account_and_or_method_has_not_been_authorized_by_the_user = "The requested account and/or method has not been authorized by the user",
    the_requested_method_is_not_supported_by_this_ethereum_provider = "The requested method is not supported by this Ethereum provider",
    the_provider_is_disconnected_from_all_chains = "The provider is disconnected from all chains",
    the_provider_is_disconnected_from_the_specified_chain = "The provider is disconnected from the specified chain",
}
// prettier-ignore
const codeMap = {
    "Invalid input": -32000,
    "Resource not found": -32001,
    "Resource unavailable": -32002,
    "Transaction rejected": -32003,
    "Method not supported": -32004,
    "Limit exceeded": -32005,
    "JSON-RPC version not supported": -32006,
    "Invalid request": -32600,
    "The method \"eth_subscribe\" is only available on the mainnet.": -32601,
    "Invalid address": -32602,
    "Invalid params": -32602,
    "A permission request must contain at least 1 permission.": -32602,
    "A symbol is required, but was not found in either the request or contract": -32602,
    "Decimals are required, but were not found in either the request or contract": -32602,
    "The token address seems invalid": -32602,
    "Unable to verify ownership. Possibly because the standard is not supported or the user's currently selected network does not match the chain of the asset in question.": -32602,
    "Internal error": -32603,
    "Parse error": -32700,
    "User rejected the request": 4001,
    "The requested account and/or method has not been authorized by the user": 4100,
    "The requested method is not supported by this Ethereum provider": 4200,
    "The provider is disconnected from all chains": 4900,
    "The provider is disconnected from the specified chain": 4901,
}
// prettier-ignore
export const err = {
    invalid_input(options: MaskEthereumProviderRpcErrorOptions = {}) {
        return new MaskEthereumProviderRpcError(-32000, "Invalid input", options)
    },
    resource_not_found(options: MaskEthereumProviderRpcErrorOptions = {}) {
        return new MaskEthereumProviderRpcError(-32001, "Resource not found", options)
    },
    resource_unavailable(options: MaskEthereumProviderRpcErrorOptions = {}) {
        return new MaskEthereumProviderRpcError(-32002, "Resource unavailable", options)
    },
    transaction_rejected(options: MaskEthereumProviderRpcErrorOptions = {}) {
        return new MaskEthereumProviderRpcError(-32003, "Transaction rejected", options)
    },
    method_not_supported(options: MaskEthereumProviderRpcErrorOptions = {}) {
        return new MaskEthereumProviderRpcError(-32004, "Method not supported", options)
    },
    limit_exceeded(options: MaskEthereumProviderRpcErrorOptions = {}) {
        return new MaskEthereumProviderRpcError(-32005, "Limit exceeded", options)
    },
    json_rpc_version_not_supported(options: MaskEthereumProviderRpcErrorOptions = {}) {
        return new MaskEthereumProviderRpcError(-32006, "JSON-RPC version not supported", options)
    },
    invalid_request(options: MaskEthereumProviderRpcErrorOptions = {}) {
        return new MaskEthereumProviderRpcError(-32600, "Invalid request", options)
    },
    the_method_method_does_not_exist_is_not_available({ method }: Record<"method", string>,options: MaskEthereumProviderRpcErrorOptions = {}) {
        return new MaskEthereumProviderRpcError(-32601, `The method "${method}" does not exist / is not available.`, options)
    },
    the_method_eth_subscribe_is_only_available_on_the_mainnet(options: MaskEthereumProviderRpcErrorOptions = {}) {
        return new MaskEthereumProviderRpcError(-32601, "The method \"eth_subscribe\" is only available on the mainnet.", options)
    },
    invalid_address(options: MaskEthereumProviderRpcErrorOptions = {}) {
        return new MaskEthereumProviderRpcError(-32602, "Invalid address", options)
    },
    invalid_params(options: MaskEthereumProviderRpcErrorOptions = {}) {
        return new MaskEthereumProviderRpcError(-32602, "Invalid params", options)
    },
    wallet_requestPermissions: {
        a_permission_request_must_contain_at_least_1_permission(options: MaskEthereumProviderRpcErrorOptions = {}) {
            return new MaskEthereumProviderRpcError(-32602, "A permission request must contain at least 1 permission.", options)
        },
        permission_request_contains_unsupported_permission_permission({ permission }: Record<"permission", string>,options: MaskEthereumProviderRpcErrorOptions = {}) {
            return new MaskEthereumProviderRpcError(-32602, `Permission request contains unsupported permission ${permission}.`, options)
        },
    },
    wallet_watchAsset: {
        a_symbol_is_required_but_was_not_found_in_either_the_request_or_contract(options: MaskEthereumProviderRpcErrorOptions = {}) {
            return new MaskEthereumProviderRpcError(-32602, "A symbol is required, but was not found in either the request or contract", options)
        },
        decimals_are_required_but_were_not_found_in_either_the_request_or_contract(options: MaskEthereumProviderRpcErrorOptions = {}) {
            return new MaskEthereumProviderRpcError(-32602, "Decimals are required, but were not found in either the request or contract", options)
        },
        the_decimals_in_the_request_request_do_not_match_the_decimals_in_the_contract_decimals({ request, decimals }: Record<"request" | "decimals", string>,options: MaskEthereumProviderRpcErrorOptions = {}) {
            return new MaskEthereumProviderRpcError(-32602, `The decimals in the request (${request}) do not match the decimals in the contract (${decimals})`, options)
        },
        the_symbol_in_the_request_request_does_not_match_the_symbol_in_the_contract_symbol({ request, symbol }: Record<"request" | "symbol", string>,options: MaskEthereumProviderRpcErrorOptions = {}) {
            return new MaskEthereumProviderRpcError(-32602, `The symbol in the request (${request}) does not match the symbol in the contract (${symbol})`, options)
        },
        the_token_address_seems_invalid(options: MaskEthereumProviderRpcErrorOptions = {}) {
            return new MaskEthereumProviderRpcError(-32602, "The token address seems invalid", options)
        },
        unable_to_verify_ownership_possibly_because_the_standard_is_not_supported_or_the_users_currently_selected_network_does_not_match_the_chain_of_the_asset_in_question(options: MaskEthereumProviderRpcErrorOptions = {}) {
            return new MaskEthereumProviderRpcError(-32602, "Unable to verify ownership. Possibly because the standard is not supported or the user's currently selected network does not match the chain of the asset in question.", options)
        },
    },
    internal_error(options: MaskEthereumProviderRpcErrorOptions = {}) {
        return new MaskEthereumProviderRpcError(-32603, "Internal error", options)
    },
    parse_error(options: MaskEthereumProviderRpcErrorOptions = {}) {
        return new MaskEthereumProviderRpcError(-32700, "Parse error", options)
    },
    user_rejected_the_request(options: MaskEthereumProviderRpcErrorOptions = {}) {
        return new MaskEthereumProviderRpcError(4001, "User rejected the request", options)
    },
    the_requested_account_and_or_method_has_not_been_authorized_by_the_user(options: MaskEthereumProviderRpcErrorOptions = {}) {
        return new MaskEthereumProviderRpcError(4100, "The requested account and/or method has not been authorized by the user", options)
    },
    the_requested_method_is_not_supported_by_this_ethereum_provider(options: MaskEthereumProviderRpcErrorOptions = {}) {
        return new MaskEthereumProviderRpcError(4200, "The requested method is not supported by this Ethereum provider", options)
    },
    the_provider_is_disconnected_from_all_chains(options: MaskEthereumProviderRpcErrorOptions = {}) {
        return new MaskEthereumProviderRpcError(4900, "The provider is disconnected from all chains", options)
    },
    the_provider_is_disconnected_from_the_specified_chain(options: MaskEthereumProviderRpcErrorOptions = {}) {
        return new MaskEthereumProviderRpcError(4901, "The provider is disconnected from the specified chain", options)
    },
}
