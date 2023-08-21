var data = {lines:[
{"lineNum":"    1","line":"// Copyright (c) 2014-2015 The Bitcoin Core developers"},
{"lineNum":"    2","line":"// Distributed under the MIT software license, see the accompanying"},
{"lineNum":"    3","line":"// file COPYING or http://www.opensource.org/licenses/mit-license.php."},
{"lineNum":"    4","line":""},
{"lineNum":"    5","line":"#ifndef BITCOIN_CHAINPARAMSBASE_H"},
{"lineNum":"    6","line":"#define BITCOIN_CHAINPARAMSBASE_H"},
{"lineNum":"    7","line":""},
{"lineNum":"    8","line":"#include <string>"},
{"lineNum":"    9","line":"#include <vector>"},
{"lineNum":"   10","line":""},
{"lineNum":"   11","line":"/**"},
{"lineNum":"   12","line":" * CBaseChainParams defines the base parameters (shared between bitcoin-cli and bitcoind)"},
{"lineNum":"   13","line":" * of a given instance of the Bitcoin system."},
{"lineNum":"   14","line":" */"},
{"lineNum":"   15","line":"class CBaseChainParams","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   16","line":"{"},
{"lineNum":"   17","line":"public:"},
{"lineNum":"   18","line":"    /** BIP70 chain name strings (main, test or regtest) */"},
{"lineNum":"   19","line":"    static const std::string MAIN;"},
{"lineNum":"   20","line":"    static const std::string TESTNET;"},
{"lineNum":"   21","line":"    static const std::string DEVNET;"},
{"lineNum":"   22","line":"    static const std::string REGTEST;"},
{"lineNum":"   23","line":""},
{"lineNum":"   24","line":"    const std::string& DataDir() const { return strDataDir; }","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   25","line":"    int RPCPort() const { return nRPCPort; }"},
{"lineNum":"   26","line":""},
{"lineNum":"   27","line":"protected:"},
{"lineNum":"   28","line":"    CBaseChainParams() {}","class":"lineCov","hits":"2","order":"116","possible_hits":"2",},
{"lineNum":"   29","line":""},
{"lineNum":"   30","line":"    int nRPCPort;"},
{"lineNum":"   31","line":"    std::string strDataDir;"},
{"lineNum":"   32","line":"};"},
{"lineNum":"   33","line":""},
{"lineNum":"   34","line":"/**"},
{"lineNum":"   35","line":" * Append the help messages for the chainparams options to the"},
{"lineNum":"   36","line":" * parameter string."},
{"lineNum":"   37","line":" */"},
{"lineNum":"   38","line":"void AppendParamsHelpMessages(std::string& strUsage, bool debugHelp=true);"},
{"lineNum":"   39","line":""},
{"lineNum":"   40","line":"/**"},
{"lineNum":"   41","line":" * Return the currently selected parameters. This won\'t change after app"},
{"lineNum":"   42","line":" * startup, except for unit tests."},
{"lineNum":"   43","line":" */"},
{"lineNum":"   44","line":"const CBaseChainParams& BaseParams();"},
{"lineNum":"   45","line":""},
{"lineNum":"   46","line":"CBaseChainParams& BaseParams(const std::string& chain);"},
{"lineNum":"   47","line":""},
{"lineNum":"   48","line":"/** Sets the params returned by Params() to those for the given network. */"},
{"lineNum":"   49","line":"void SelectBaseParams(const std::string& chain);"},
{"lineNum":"   50","line":""},
{"lineNum":"   51","line":"/**"},
{"lineNum":"   52","line":" * Looks for -regtest, -testnet and returns the appropriate BIP70 chain name."},
{"lineNum":"   53","line":" * @return CBaseChainParams::MAX_NETWORK_TYPES if an invalid combination is given. CBaseChainParams::MAIN by default."},
{"lineNum":"   54","line":" */"},
{"lineNum":"   55","line":"std::string ChainNameFromCommandLine();"},
{"lineNum":"   56","line":""},
{"lineNum":"   57","line":"/**"},
{"lineNum":"   58","line":" * Return true if SelectBaseParamsFromCommandLine() has been called to select"},
{"lineNum":"   59","line":" * a network."},
{"lineNum":"   60","line":" */"},
{"lineNum":"   61","line":"bool AreBaseParamsConfigured();"},
{"lineNum":"   62","line":""},
{"lineNum":"   63","line":"#endif // BITCOIN_CHAINPARAMSBASE_H"},
]};
var percent_low = 25;var percent_high = 75;
var header = { "command" : "grootle_fuzz_debug", "date" : "2023-08-17 10:24:07", "instrumented" : 3, "covered" : 1,};
var merged_data = [];
