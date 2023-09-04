var data = {lines:[
{"lineNum":"    1","line":"#include \"mint_transaction.h\""},
{"lineNum":"    2","line":""},
{"lineNum":"    3","line":"namespace spark {"},
{"lineNum":"    4","line":""},
{"lineNum":"    5","line":"MintTransaction::MintTransaction(const Params* params) {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"    6","line":"    this->params = params;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"    7","line":"}","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"    8","line":""},
{"lineNum":"    9","line":"MintTransaction::MintTransaction(","class":"lineCov","hits":"1","possible_hits":"1",},
{"lineNum":"   10","line":"\tconst Params* params,"},
{"lineNum":"   11","line":"\tconst std::vector<MintedCoinData>& outputs,"},
{"lineNum":"   12","line":"\tconst std::vector<unsigned char>& serial_context,"},
{"lineNum":"   13","line":"    bool generate"},
{"lineNum":"   14","line":") {","class":"linePartCov","hits":"1","possible_hits":"2",},
{"lineNum":"   15","line":"\t// Important note: This construction assumes that the public coin values are correct according to higher-level consensus rules!"},
{"lineNum":"   16","line":"\t// Important note: For pool transition transactions, the serial context should contain unique references to all base-layer spent assets, in order to ensure the resulting serial commitment is bound to this transaction"},
{"lineNum":"   17","line":""},
{"lineNum":"   18","line":"\tthis->params = params;","class":"lineCov","hits":"1","possible_hits":"1",},
{"lineNum":"   19","line":"\tSchnorr schnorr(this->params->get_H());","class":"lineCov","hits":"1","possible_hits":"1",},
{"lineNum":"   20","line":""},
{"lineNum":"   21","line":"\tstd::vector<GroupElement> value_statement;","class":"lineCov","hits":"1","possible_hits":"1",},
{"lineNum":"   22","line":"\tstd::vector<Scalar> value_witness;","class":"lineCov","hits":"1","possible_hits":"1",},
{"lineNum":"   23","line":""},
{"lineNum":"   24","line":"\tfor (std::size_t j = 0; j < outputs.size(); j++) {","class":"linePartCov","hits":"1","possible_hits":"2",},
{"lineNum":"   25","line":"        if (generate) {","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   26","line":"            MintedCoinData output = outputs[j];","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   27","line":""},
{"lineNum":"   28","line":"            // Generate the coin"},
{"lineNum":"   29","line":"            Scalar k;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   30","line":"            k.randomize();","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   31","line":"            this->coins.emplace_back(Coin(","class":"lineNoCov","hits":"0","possible_hits":"3",},
{"lineNum":"   32","line":"                this->params,","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   33","line":"                COIN_TYPE_MINT,"},
{"lineNum":"   34","line":"                k,"},
{"lineNum":"   35","line":"                output.address,"},
{"lineNum":"   36","line":"                output.v,","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   37","line":"                output.memo,","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   38","line":"                serial_context","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   39","line":"            ));"},
{"lineNum":"   40","line":""},
{"lineNum":"   41","line":"            // Prepare the value proof"},
{"lineNum":"   42","line":"            value_statement.emplace_back(this->coins[j].C + this->params->get_G().inverse()*Scalar(this->coins[j].v));","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   43","line":"            value_witness.emplace_back(SparkUtils::hash_val(k));","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   44","line":"        } else {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   45","line":"            Coin coin;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   46","line":"            coin.type = 0;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   47","line":"            coin.r_.ciphertext.resize(32);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   48","line":"            coin.r_.key_commitment.resize(64);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   49","line":"            coin.r_.tag.resize(16);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   50","line":"            coin.v = 0;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   51","line":"            this->coins.emplace_back(coin);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   52","line":"        }","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   53","line":"\t}","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   54","line":""},
{"lineNum":"   55","line":"\t// Complete the value proof"},
{"lineNum":"   56","line":"    if (generate)","class":"lineCov","hits":"1","possible_hits":"1",},
{"lineNum":"   57","line":"\t    schnorr.prove(value_witness, value_statement, this->value_proof);","class":"lineCov","hits":"1","possible_hits":"1",},
{"lineNum":"   58","line":"    else"},
{"lineNum":"   59","line":"        value_proof = SchnorrProof();","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   60","line":"}","class":"lineNoCov","hits":"0","possible_hits":"6",},
{"lineNum":"   61","line":""},
{"lineNum":"   62","line":"bool MintTransaction::verify() {","class":"linePartCov","hits":"1","possible_hits":"2",},
{"lineNum":"   63","line":"\t// Verify the value proof"},
{"lineNum":"   64","line":"\tSchnorr schnorr(this->params->get_H());","class":"lineCov","hits":"1","possible_hits":"1",},
{"lineNum":"   65","line":"\tstd::vector<GroupElement> value_statement;","class":"lineCov","hits":"1","possible_hits":"1",},
{"lineNum":"   66","line":""},
{"lineNum":"   67","line":"\tfor (std::size_t j = 0; j < this->coins.size(); j++) {","class":"linePartCov","hits":"1","possible_hits":"2",},
{"lineNum":"   68","line":"\t\tvalue_statement.emplace_back(this->coins[j].C + this->params->get_G().inverse()*Scalar(this->coins[j].v));","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   69","line":"\t}"},
{"lineNum":"   70","line":""},
{"lineNum":"   71","line":"\treturn schnorr.verify(value_statement, this->value_proof);","class":"lineCov","hits":"1","possible_hits":"1",},
{"lineNum":"   72","line":"}","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   73","line":""},
{"lineNum":"   74","line":"std::vector<CDataStream> MintTransaction::getMintedCoinsSerialized() {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   75","line":"    std::vector<CDataStream> serializedCoins;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   76","line":"    bool first = true;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   77","line":"    for (const auto& coin : coins) {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   78","line":"        CDataStream serializedCoin(SER_NETWORK, 0);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   79","line":"        serializedCoin << coin;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   80","line":"        if (first) {","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   81","line":"            serializedCoin << value_proof;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   82","line":"            first = false;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   83","line":"        }","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   84","line":"        serializedCoins.push_back(serializedCoin);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   85","line":"    }","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   86","line":"    return serializedCoins;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   87","line":"}","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   88","line":""},
{"lineNum":"   89","line":"void MintTransaction::setMintTransaction(std::vector<CDataStream>& serializedCoins) {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   90","line":"    bool first = true;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   91","line":"    coins.reserve(serializedCoins.size());","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   92","line":"    size_t i = 0;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   93","line":"    for (auto& stream : serializedCoins) {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   94","line":"        Coin coin(params);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   95","line":"        stream >> coin;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   96","line":"        coins.push_back(coin);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   97","line":"        i++;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   98","line":"        if (first) {","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   99","line":"            stream >> value_proof;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  100","line":"            first = false;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  101","line":"        }","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  102","line":"    }","class":"lineNoCov","hits":"0","possible_hits":"3",},
{"lineNum":"  103","line":"}","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  104","line":""},
{"lineNum":"  105","line":"void MintTransaction::getCoins(std::vector<Coin>& coins_) {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  106","line":"    coins_.insert(coins_.end(), coins.begin(), coins.end());","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  107","line":"}","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  108","line":""},
{"lineNum":"  109","line":""},
{"lineNum":"  110","line":"} // namespace spark"},
]};
var percent_low = 25;var percent_high = 75;
var header = { "command" : "mint_transaction_debug", "date" : "2023-08-28 11:34:46", "instrumented" : 74, "covered" : 14,};
var merged_data = [];
