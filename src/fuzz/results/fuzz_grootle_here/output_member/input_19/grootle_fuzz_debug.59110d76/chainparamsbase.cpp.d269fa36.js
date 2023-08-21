var data = {lines:[
{"lineNum":"    1","line":"// Copyright (c) 2010 Satoshi Nakamoto"},
{"lineNum":"    2","line":"// Copyright (c) 2009-2015 The Bitcoin Core developers"},
{"lineNum":"    3","line":"// Distributed under the MIT software license, see the accompanying"},
{"lineNum":"    4","line":"// file COPYING or http://www.opensource.org/licenses/mit-license.php."},
{"lineNum":"    5","line":""},
{"lineNum":"    6","line":"#include \"chainparamsbase.h\""},
{"lineNum":"    7","line":""},
{"lineNum":"    8","line":"#include \"tinyformat.h\""},
{"lineNum":"    9","line":"#include \"util.h\""},
{"lineNum":"   10","line":""},
{"lineNum":"   11","line":"#include <assert.h>"},
{"lineNum":"   12","line":""},
{"lineNum":"   13","line":"const std::string CBaseChainParams::MAIN = \"main\";","class":"lineCov","hits":"2","order":"109","possible_hits":"2",},
{"lineNum":"   14","line":"const std::string CBaseChainParams::TESTNET = \"test\";","class":"lineCov","hits":"2","order":"110","possible_hits":"2",},
{"lineNum":"   15","line":"const std::string CBaseChainParams::DEVNET = \"dev\";","class":"lineCov","hits":"2","order":"111","possible_hits":"2",},
{"lineNum":"   16","line":"const std::string CBaseChainParams::REGTEST = \"regtest\";","class":"lineCov","hits":"2","order":"112","possible_hits":"2",},
{"lineNum":"   17","line":""},
{"lineNum":"   18","line":"void AppendParamsHelpMessages(std::string& strUsage, bool debugHelp)"},
{"lineNum":"   19","line":"{","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   20","line":"    strUsage += HelpMessageGroup(_(\"Chain selection options:\"));","class":"lineNoCov","hits":"0","possible_hits":"4",},
{"lineNum":"   21","line":"    strUsage += HelpMessageOpt(\"-testnet\", _(\"Use the test chain\"));","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   22","line":"    strUsage += HelpMessageOpt(\"-devnet\", _(\"Use the dev chain\"));","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   23","line":"    if (debugHelp) {","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   24","line":"        strUsage += HelpMessageOpt(\"-regtest\", \"Enter regression test mode, which uses a special chain in which blocks can be solved instantly. \"","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   25","line":"                                   \"This is intended for regression testing tools and app development.\");"},
{"lineNum":"   26","line":"    }","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   27","line":"}","class":"lineNoCov","hits":"0","possible_hits":"5",},
{"lineNum":"   28","line":""},
{"lineNum":"   29","line":"/**"},
{"lineNum":"   30","line":" * Main network"},
{"lineNum":"   31","line":" */"},
{"lineNum":"   32","line":"class CBaseMainParams : public CBaseChainParams","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   33","line":"{"},
{"lineNum":"   34","line":"public:"},
{"lineNum":"   35","line":"    CBaseMainParams()","class":"lineCov","hits":"1","order":"115","possible_hits":"1",},
{"lineNum":"   36","line":"    {","class":"lineCov","hits":"2","order":"114","possible_hits":"2",},
{"lineNum":"   37","line":"        nRPCPort = 8888;","class":"lineCov","hits":"1","order":"117","possible_hits":"1",},
{"lineNum":"   38","line":"    }","class":"linePartCov","hits":"1","order":"118","possible_hits":"2",},
{"lineNum":"   39","line":"};"},
{"lineNum":"   40","line":"static CBaseMainParams mainParams;","class":"lineCov","hits":"2","order":"113","possible_hits":"2",},
{"lineNum":"   41","line":""},
{"lineNum":"   42","line":"/**"},
{"lineNum":"   43","line":" * Testnet (v3)"},
{"lineNum":"   44","line":" */"},
{"lineNum":"   45","line":"class CBaseTestNetParams : public CBaseChainParams","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   46","line":"{"},
{"lineNum":"   47","line":"public:"},
{"lineNum":"   48","line":"    CBaseTestNetParams()","class":"lineCov","hits":"1","order":"121","possible_hits":"1",},
{"lineNum":"   49","line":"    {","class":"lineCov","hits":"2","order":"120","possible_hits":"2",},
{"lineNum":"   50","line":"        nRPCPort = 18888;","class":"lineCov","hits":"1","order":"122","possible_hits":"1",},
{"lineNum":"   51","line":"        strDataDir = \"testnet3\";","class":"lineCov","hits":"1","order":"123","possible_hits":"1",},
{"lineNum":"   52","line":"    }","class":"lineCov","hits":"1","order":"124","possible_hits":"1",},
{"lineNum":"   53","line":"};"},
{"lineNum":"   54","line":"static CBaseTestNetParams testNetParams;","class":"lineCov","hits":"2","order":"119","possible_hits":"2",},
{"lineNum":"   55","line":""},
{"lineNum":"   56","line":"/**"},
{"lineNum":"   57","line":" * Devnet"},
{"lineNum":"   58","line":" */"},
{"lineNum":"   59","line":"class CBaseDevNetParams : public CBaseChainParams","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   60","line":"{"},
{"lineNum":"   61","line":"public:"},
{"lineNum":"   62","line":"    CBaseDevNetParams()","class":"lineCov","hits":"1","order":"127","possible_hits":"1",},
{"lineNum":"   63","line":"    {","class":"lineCov","hits":"2","order":"126","possible_hits":"2",},
{"lineNum":"   64","line":"        nRPCPort = 38888;","class":"lineCov","hits":"1","order":"128","possible_hits":"1",},
{"lineNum":"   65","line":"        strDataDir = \"devnet\";","class":"lineCov","hits":"1","order":"129","possible_hits":"1",},
{"lineNum":"   66","line":"    }","class":"lineCov","hits":"1","order":"130","possible_hits":"1",},
{"lineNum":"   67","line":"};"},
{"lineNum":"   68","line":"static CBaseDevNetParams devNetParams;","class":"lineCov","hits":"2","order":"125","possible_hits":"2",},
{"lineNum":"   69","line":""},
{"lineNum":"   70","line":"/*"},
{"lineNum":"   71","line":" * Regression test"},
{"lineNum":"   72","line":" */"},
{"lineNum":"   73","line":"class CBaseRegTestParams : public CBaseChainParams","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   74","line":"{"},
{"lineNum":"   75","line":"public:"},
{"lineNum":"   76","line":"    CBaseRegTestParams()","class":"lineCov","hits":"1","order":"133","possible_hits":"1",},
{"lineNum":"   77","line":"    {","class":"lineCov","hits":"2","order":"132","possible_hits":"2",},
{"lineNum":"   78","line":"        nRPCPort = 28888;","class":"lineCov","hits":"1","order":"134","possible_hits":"1",},
{"lineNum":"   79","line":"        strDataDir = \"regtest\";","class":"lineCov","hits":"1","order":"135","possible_hits":"1",},
{"lineNum":"   80","line":"    }","class":"lineCov","hits":"1","order":"136","possible_hits":"1",},
{"lineNum":"   81","line":"};"},
{"lineNum":"   82","line":"static CBaseRegTestParams regTestParams;","class":"lineCov","hits":"2","order":"131","possible_hits":"2",},
{"lineNum":"   83","line":""},
{"lineNum":"   84","line":"static CBaseChainParams* pCurrentBaseParams = 0;"},
{"lineNum":"   85","line":""},
{"lineNum":"   86","line":"const CBaseChainParams& BaseParams()"},
{"lineNum":"   87","line":"{","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   88","line":"    assert(pCurrentBaseParams);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   89","line":"    return *pCurrentBaseParams;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   90","line":"}"},
{"lineNum":"   91","line":""},
{"lineNum":"   92","line":"CBaseChainParams& BaseParams(const std::string& chain)"},
{"lineNum":"   93","line":"{","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   94","line":"    if (chain == CBaseChainParams::MAIN)","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   95","line":"        return mainParams;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   96","line":"    else if (chain == CBaseChainParams::TESTNET)","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   97","line":"        return testNetParams;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   98","line":"    else if (chain == CBaseChainParams::DEVNET)","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   99","line":"        return devNetParams;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  100","line":"    else if (chain == CBaseChainParams::REGTEST)","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  101","line":"        return regTestParams;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  102","line":"    else"},
{"lineNum":"  103","line":"        throw std::runtime_error(strprintf(\"%s: Unknown chain %s.\", __func__, chain));","class":"lineNoCov","hits":"0","possible_hits":"4",},
{"lineNum":"  104","line":"}","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  105","line":""},
{"lineNum":"  106","line":"void SelectBaseParams(const std::string& chain)"},
{"lineNum":"  107","line":"{","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  108","line":"    pCurrentBaseParams = &BaseParams(chain);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  109","line":"}","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  110","line":""},
{"lineNum":"  111","line":"std::string ChainNameFromCommandLine()"},
{"lineNum":"  112","line":"{","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  113","line":"    bool fRegTest = GetBoolArg(\"-regtest\", false);","class":"lineNoCov","hits":"0","possible_hits":"4",},
{"lineNum":"  114","line":"    bool fDevNet = GetBoolArg(\"-devnet\", false);","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  115","line":"    bool fTestNet = GetBoolArg(\"-testnet\", false);","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  116","line":""},
{"lineNum":"  117","line":"    if ((int)fTestNet + (int)fDevNet + (int)fRegTest > 1)","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  118","line":"        throw std::runtime_error(\"Invalid combination of -regtest, -devnet and -testnet.\");","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  119","line":"    if (fRegTest)","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  120","line":"        return CBaseChainParams::REGTEST;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  121","line":"    if (fDevNet)","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  122","line":"        return CBaseChainParams::DEVNET;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  123","line":"    if (fTestNet)","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  124","line":"        return CBaseChainParams::TESTNET;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  125","line":"    return CBaseChainParams::MAIN;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  126","line":"}","class":"lineNoCov","hits":"0","possible_hits":"5",},
{"lineNum":"  127","line":""},
{"lineNum":"  128","line":"bool AreBaseParamsConfigured()"},
{"lineNum":"  129","line":"{","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  130","line":"    return pCurrentBaseParams != NULL;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  131","line":"}"},
]};
var percent_low = 25;var percent_high = 75;
var header = { "command" : "grootle_fuzz_debug", "date" : "2023-08-17 10:28:11", "instrumented" : 72, "covered" : 27,};
var merged_data = [];
