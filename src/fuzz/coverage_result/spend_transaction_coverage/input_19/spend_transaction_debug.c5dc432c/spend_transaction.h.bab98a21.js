var data = {lines:[
{"lineNum":"    1","line":"#ifndef FIRO_SPARK_SPEND_TRANSACTION_H"},
{"lineNum":"    2","line":"#define FIRO_SPARK_SPEND_TRANSACTION_H"},
{"lineNum":"    3","line":"#include \"keys.h\""},
{"lineNum":"    4","line":"#include \"coin.h\""},
{"lineNum":"    5","line":"#include \"schnorr.h\""},
{"lineNum":"    6","line":"#include \"util.h\""},
{"lineNum":"    7","line":"#include \"grootle.h\""},
{"lineNum":"    8","line":"#include \"bpplus.h\""},
{"lineNum":"    9","line":"#include \"chaum.h\""},
{"lineNum":"   10","line":""},
{"lineNum":"   11","line":"namespace spark {"},
{"lineNum":"   12","line":""},
{"lineNum":"   13","line":"using namespace secp_primitives;"},
{"lineNum":"   14","line":""},
{"lineNum":"   15","line":"// Note that cover sets are treated as monotonic, meaning they grow over time (up to some implementation-defined limit)"},
{"lineNum":"   16","line":"// To support efficient batching, we track which set each spend references"},
{"lineNum":"   17","line":"// If spends share a `cover_set_id`, we assume the corresponding `cover_set` vectors have a subset relationship"},
{"lineNum":"   18","line":"// This relationship _must_ be checked elsewhere, as we simply use the largest `cover_set` for each `cover_set_id`!"},
{"lineNum":"   19","line":"struct InputCoinData {","class":"lineNoCov","hits":"0","possible_hits":"6",},
{"lineNum":"   20","line":"\tuint64_t cover_set_id; // an identifier for the monotonically-growing set of which `cover_set` is a subset"},
{"lineNum":"   21","line":"    std::size_t index; // index of the coin in the cover set"},
{"lineNum":"   22","line":"\tScalar s; // serial number"},
{"lineNum":"   23","line":"\tGroupElement T; // tag"},
{"lineNum":"   24","line":"\tuint64_t v; // value"},
{"lineNum":"   25","line":"\tScalar k; // nonce"},
{"lineNum":"   26","line":"};"},
{"lineNum":"   27","line":""},
{"lineNum":"   28","line":"struct CoverSetData {","class":"lineNoCov","hits":"0","possible_hits":"8",},
{"lineNum":"   29","line":"    std::vector<Coin> cover_set; // set of coins used as a cover set for the spend"},
{"lineNum":"   30","line":"    std::vector<unsigned char> cover_set_representation; // a unique representation for the ordered elements of the partial `cover_set` used in the spend"},
{"lineNum":"   31","line":"};"},
{"lineNum":"   32","line":""},
{"lineNum":"   33","line":"struct OutputCoinData {","class":"lineNoCov","hits":"0","possible_hits":"6",},
{"lineNum":"   34","line":"\tAddress address;"},
{"lineNum":"   35","line":"\tuint64_t v;"},
{"lineNum":"   36","line":"\tstd::string memo;"},
{"lineNum":"   37","line":"};"},
{"lineNum":"   38","line":""},
{"lineNum":"   39","line":"class SpendTransaction {","class":"lineNoCov","hits":"0","possible_hits":"4",},
{"lineNum":"   40","line":"public:"},
{"lineNum":"   41","line":"    SpendTransaction("},
{"lineNum":"   42","line":"            const Params* params);"},
{"lineNum":"   43","line":""},
{"lineNum":"   44","line":"\tSpendTransaction("},
{"lineNum":"   45","line":"\t\tconst Params* params,"},
{"lineNum":"   46","line":"\t\tconst FullViewKey& full_view_key,"},
{"lineNum":"   47","line":"\t\tconst SpendKey& spend_key,"},
{"lineNum":"   48","line":"\t\tconst std::vector<InputCoinData>& inputs,"},
{"lineNum":"   49","line":"        const std::unordered_map<uint64_t, CoverSetData>& cover_set_data,"},
{"lineNum":"   50","line":"\t\tconst uint64_t f,"},
{"lineNum":"   51","line":"        const uint64_t vout,"},
{"lineNum":"   52","line":"\t\tconst std::vector<OutputCoinData>& outputs"},
{"lineNum":"   53","line":"\t);"},
{"lineNum":"   54","line":""},
{"lineNum":"   55","line":"\tuint64_t getFee();"},
{"lineNum":"   56","line":"    const std::vector<GroupElement>& getUsedLTags() const;"},
{"lineNum":"   57","line":"    const std::vector<Coin>& getOutCoins();"},
{"lineNum":"   58","line":"    const std::vector<uint64_t>& getCoinGroupIds();"},
{"lineNum":"   59","line":""},
{"lineNum":"   60","line":"\tstatic bool verify(const Params* params, const std::vector<SpendTransaction>& transactions, const std::unordered_map<uint64_t, std::vector<Coin>>& cover_sets);"},
{"lineNum":"   61","line":"\tstatic bool verify(const SpendTransaction& transaction, const std::unordered_map<uint64_t, std::vector<Coin>>& cover_sets);"},
{"lineNum":"   62","line":""},
{"lineNum":"   63","line":"\tstatic Scalar hash_bind("},
{"lineNum":"   64","line":"        const std::vector<Coin>& out_coins,"},
{"lineNum":"   65","line":"        const uint64_t f_,"},
{"lineNum":"   66","line":"\t\tconst std::unordered_map<uint64_t, std::vector<unsigned char>>& cover_set_representations,"},
{"lineNum":"   67","line":"        const std::vector<GroupElement>& S1,"},
{"lineNum":"   68","line":"        const std::vector<GroupElement>& C1,"},
{"lineNum":"   69","line":"        const std::vector<GroupElement>& T,"},
{"lineNum":"   70","line":"        const std::vector<GrootleProof>& grootle_proofs,"},
{"lineNum":"   71","line":"        const SchnorrProof& balance_proof,"},
{"lineNum":"   72","line":"\t\tconst BPPlusProof& range_proof"},
{"lineNum":"   73","line":"    );"},
{"lineNum":"   74","line":""},
{"lineNum":"   75","line":"    ADD_SERIALIZE_METHODS;"},
{"lineNum":"   76","line":"    template <typename Stream, typename Operation>"},
{"lineNum":"   77","line":"    void SerializationOp(Stream& s, Operation ser_action)"},
{"lineNum":"   78","line":"    {"},
{"lineNum":"   79","line":"        READWRITE(cover_set_ids);"},
{"lineNum":"   80","line":"        READWRITE(set_id_blockHash);"},
{"lineNum":"   81","line":"        READWRITE(f);"},
{"lineNum":"   82","line":"        READWRITE(S1);"},
{"lineNum":"   83","line":"        READWRITE(C1);"},
{"lineNum":"   84","line":"        READWRITE(T);"},
{"lineNum":"   85","line":"        READWRITE(grootle_proofs);"},
{"lineNum":"   86","line":"        READWRITE(chaum_proof);"},
{"lineNum":"   87","line":"        READWRITE(balance_proof);"},
{"lineNum":"   88","line":"        READWRITE(range_proof);"},
{"lineNum":"   89","line":"    }"},
{"lineNum":"   90","line":""},
{"lineNum":"   91","line":"    void setOutCoins(const std::vector<Coin>& out_coins_) {"},
{"lineNum":"   92","line":"        this->out_coins = out_coins_;"},
{"lineNum":"   93","line":"    }"},
{"lineNum":"   94","line":""},
{"lineNum":"   95","line":"    void setCoverSets(const std::unordered_map<uint64_t, CoverSetData>& cover_set_data) {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   96","line":"        for (const auto& data : cover_set_data) {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   97","line":"            this->cover_set_sizes[data.first] = data.second.cover_set.size();","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   98","line":"            this->cover_set_representations[data.first] = data.second.cover_set_representation;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   99","line":"        }"},
{"lineNum":"  100","line":"    }","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  101","line":""},
{"lineNum":"  102","line":"    void setVout(const uint64_t& vout_) {"},
{"lineNum":"  103","line":"        this->vout = vout_;"},
{"lineNum":"  104","line":"    }"},
{"lineNum":"  105","line":""},
{"lineNum":"  106","line":"    void setBlockHashes(const std::map<uint64_t, uint256>& idAndHashes);"},
{"lineNum":"  107","line":""},
{"lineNum":"  108","line":"    const std::map<uint64_t, uint256>& getBlockHashes();"},
{"lineNum":"  109","line":"private:"},
{"lineNum":"  110","line":"\tconst Params* params;"},
{"lineNum":"  111","line":"    // We need to construct and pass this data before running verification"},
{"lineNum":"  112","line":"\tstd::unordered_map<uint64_t, std::size_t> cover_set_sizes;"},
{"lineNum":"  113","line":"    std::unordered_map<uint64_t, std::vector<unsigned char>> cover_set_representations;"},
{"lineNum":"  114","line":"\tstd::vector<Coin> out_coins;"},
{"lineNum":"  115","line":""},
{"lineNum":"  116","line":"    // All this data we need to serialize"},
{"lineNum":"  117","line":"    std::map<uint64_t, uint256> set_id_blockHash;"},
{"lineNum":"  118","line":"    std::vector<uint64_t> cover_set_ids;"},
{"lineNum":"  119","line":"\tuint64_t f;"},
{"lineNum":"  120","line":"    uint64_t vout;"},
{"lineNum":"  121","line":"\tstd::vector<GroupElement> S1, C1, T;"},
{"lineNum":"  122","line":"\tstd::vector<GrootleProof> grootle_proofs;"},
{"lineNum":"  123","line":"\tChaumProof chaum_proof;"},
{"lineNum":"  124","line":"\tSchnorrProof balance_proof;"},
{"lineNum":"  125","line":"\tBPPlusProof range_proof;"},
{"lineNum":"  126","line":"};"},
{"lineNum":"  127","line":""},
{"lineNum":"  128","line":"}"},
{"lineNum":"  129","line":""},
{"lineNum":"  130","line":"#endif"},
]};
var percent_low = 25;var percent_high = 75;
var header = { "command" : "spend_transaction_debug", "date" : "2023-08-30 10:01:24", "instrumented" : 9, "covered" : 0,};
var merged_data = [];
