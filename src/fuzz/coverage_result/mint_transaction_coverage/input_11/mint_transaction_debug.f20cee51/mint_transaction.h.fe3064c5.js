var data = {lines:[
{"lineNum":"    1","line":"#ifndef FIRO_SPARK_MINT_TRANSACTION_H"},
{"lineNum":"    2","line":"#define FIRO_SPARK_MINT_TRANSACTION_H"},
{"lineNum":"    3","line":"#include \"keys.h\""},
{"lineNum":"    4","line":"#include \"coin.h\""},
{"lineNum":"    5","line":"#include \"schnorr.h\""},
{"lineNum":"    6","line":"#include \"util.h\""},
{"lineNum":"    7","line":""},
{"lineNum":"    8","line":"namespace spark {"},
{"lineNum":"    9","line":""},
{"lineNum":"   10","line":"using namespace secp_primitives;"},
{"lineNum":"   11","line":""},
{"lineNum":"   12","line":"struct MintedCoinData {","class":"linePartCov","hits":"1","possible_hits":"6",},
{"lineNum":"   13","line":"\tAddress address;"},
{"lineNum":"   14","line":"\tuint64_t v;"},
{"lineNum":"   15","line":"\tstd::string memo;"},
{"lineNum":"   16","line":"};"},
{"lineNum":"   17","line":""},
{"lineNum":"   18","line":"class MintTransaction {","class":"lineCov","hits":"2","order":"1229","possible_hits":"2",},
{"lineNum":"   19","line":"public:"},
{"lineNum":"   20","line":"    MintTransaction(const Params* params);"},
{"lineNum":"   21","line":"\tMintTransaction("},
{"lineNum":"   22","line":"\t\tconst Params* params,"},
{"lineNum":"   23","line":"\t\tconst std::vector<MintedCoinData>& outputs,"},
{"lineNum":"   24","line":"\t\tconst std::vector<unsigned char>& serial_context,"},
{"lineNum":"   25","line":"        bool generate = true"},
{"lineNum":"   26","line":"\t);"},
{"lineNum":"   27","line":"\tbool verify();"},
{"lineNum":"   28","line":""},
{"lineNum":"   29","line":"    // returns the vector of serialized coins, with first one it puts also the chnorr proof;"},
{"lineNum":"   30","line":"    std::vector<CDataStream> getMintedCoinsSerialized();"},
{"lineNum":"   31","line":""},
{"lineNum":"   32","line":"    // deserialize from the vector of CDataStreams"},
{"lineNum":"   33","line":"    void setMintTransaction(std::vector<CDataStream>& serializedCoins);"},
{"lineNum":"   34","line":""},
{"lineNum":"   35","line":"    void getCoins(std::vector<Coin>& coins_);"},
{"lineNum":"   36","line":""},
{"lineNum":"   37","line":"private:"},
{"lineNum":"   38","line":"\tconst Params* params;"},
{"lineNum":"   39","line":"\tstd::vector<Coin> coins;"},
{"lineNum":"   40","line":"\tSchnorrProof value_proof;"},
{"lineNum":"   41","line":"};"},
{"lineNum":"   42","line":""},
{"lineNum":"   43","line":"}"},
{"lineNum":"   44","line":""},
{"lineNum":"   45","line":"#endif"},
]};
var percent_low = 25;var percent_high = 75;
var header = { "command" : "mint_transaction_debug", "date" : "2023-08-28 11:27:39", "instrumented" : 2, "covered" : 2,};
var merged_data = [];
