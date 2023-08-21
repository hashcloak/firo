var data = {lines:[
{"lineNum":"    1","line":"#ifndef FIRO_SPARK_COIN_H"},
{"lineNum":"    2","line":"#define FIRO_SPARK_COIN_H"},
{"lineNum":"    3","line":"#include \"bpplus.h\""},
{"lineNum":"    4","line":"#include \"keys.h\""},
{"lineNum":"    5","line":"#include <math.h>"},
{"lineNum":"    6","line":"#include \"params.h\""},
{"lineNum":"    7","line":"#include \"aead.h\""},
{"lineNum":"    8","line":"#include \"util.h\""},
{"lineNum":"    9","line":"#include \"../uint256.h\""},
{"lineNum":"   10","line":""},
{"lineNum":"   11","line":"namespace spark {"},
{"lineNum":"   12","line":""},
{"lineNum":"   13","line":"using namespace secp_primitives;"},
{"lineNum":"   14","line":""},
{"lineNum":"   15","line":"// Flags for coin types: those generated from mints, and those generated from spends"},
{"lineNum":"   16","line":"const char COIN_TYPE_MINT = 0;"},
{"lineNum":"   17","line":"const char COIN_TYPE_SPEND = 1;"},
{"lineNum":"   18","line":""},
{"lineNum":"   19","line":"struct IdentifiedCoinData {","class":"lineNoCov","hits":"0","possible_hits":"4",},
{"lineNum":"   20","line":"\tuint64_t i; // diversifier"},
{"lineNum":"   21","line":"\tstd::vector<unsigned char> d; // encrypted diversifier"},
{"lineNum":"   22","line":"\tuint64_t v; // value"},
{"lineNum":"   23","line":"\tScalar k; // nonce"},
{"lineNum":"   24","line":"\tstd::string memo; // memo"},
{"lineNum":"   25","line":"};"},
{"lineNum":"   26","line":""},
{"lineNum":"   27","line":"struct RecoveredCoinData {","class":"lineNoCov","hits":"0","possible_hits":"4",},
{"lineNum":"   28","line":"\tScalar s; // serial"},
{"lineNum":"   29","line":"\tGroupElement T; // tag"},
{"lineNum":"   30","line":"};"},
{"lineNum":"   31","line":""},
{"lineNum":"   32","line":"// Data to be encrypted for the recipient of a coin generated in a mint transaction"},
{"lineNum":"   33","line":"struct MintCoinRecipientData {","class":"lineNoCov","hits":"0","possible_hits":"4",},
{"lineNum":"   34","line":"\tstd::vector<unsigned char> d; // encrypted diversifier"},
{"lineNum":"   35","line":"\tScalar k; // nonce"},
{"lineNum":"   36","line":"\tstd::string memo; // memo"},
{"lineNum":"   37","line":""},
{"lineNum":"   38","line":"\tADD_SERIALIZE_METHODS;","class":"lineNoCov","hits":"0","possible_hits":"4",},
{"lineNum":"   39","line":""},
{"lineNum":"   40","line":"\ttemplate <typename Stream, typename Operation>"},
{"lineNum":"   41","line":"    inline void SerializationOp(Stream& s, Operation ser_action) {","class":"lineNoCov","hits":"0","possible_hits":"4",},
{"lineNum":"   42","line":"        READWRITE(d);","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   43","line":"\t\tREADWRITE(k);","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   44","line":"\t\tREADWRITE(memo);","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   45","line":"    }","class":"lineNoCov","hits":"0","possible_hits":"4",},
{"lineNum":"   46","line":"};"},
{"lineNum":"   47","line":""},
{"lineNum":"   48","line":"// Data to be encrypted for the recipient of a coin generated in a spend transaction"},
{"lineNum":"   49","line":"struct SpendCoinRecipientData {","class":"lineNoCov","hits":"0","possible_hits":"4",},
{"lineNum":"   50","line":"\tuint64_t v; // value"},
{"lineNum":"   51","line":"\tstd::vector<unsigned char> d; // encrypted diversifier"},
{"lineNum":"   52","line":"\tScalar k; // nonce"},
{"lineNum":"   53","line":"\tstd::string memo; // memo"},
{"lineNum":"   54","line":""},
{"lineNum":"   55","line":"\tADD_SERIALIZE_METHODS;","class":"lineNoCov","hits":"0","possible_hits":"4",},
{"lineNum":"   56","line":""},
{"lineNum":"   57","line":"\ttemplate <typename Stream, typename Operation>"},
{"lineNum":"   58","line":"    inline void SerializationOp(Stream& s, Operation ser_action) {","class":"lineNoCov","hits":"0","possible_hits":"4",},
{"lineNum":"   59","line":"        READWRITE(v);","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   60","line":"        READWRITE(d);","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   61","line":"\t\tREADWRITE(k);","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   62","line":"\t\tREADWRITE(memo);","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   63","line":"    }","class":"lineNoCov","hits":"0","possible_hits":"4",},
{"lineNum":"   64","line":"};"},
{"lineNum":"   65","line":""},
{"lineNum":"   66","line":"class Coin {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   67","line":"public:"},
{"lineNum":"   68","line":"\tCoin();"},
{"lineNum":"   69","line":"    Coin(const Params* params);"},
{"lineNum":"   70","line":"\tCoin("},
{"lineNum":"   71","line":"\t\tconst Params* params,"},
{"lineNum":"   72","line":"\t\tconst char type,"},
{"lineNum":"   73","line":"\t\tconst Scalar& k,"},
{"lineNum":"   74","line":"\t\tconst Address& address,"},
{"lineNum":"   75","line":"\t\tconst uint64_t& v,"},
{"lineNum":"   76","line":"\t\tconst std::string& memo,"},
{"lineNum":"   77","line":"\t\tconst std::vector<unsigned char>& serial_context"},
{"lineNum":"   78","line":"\t);"},
{"lineNum":"   79","line":""},
{"lineNum":"   80","line":"\t// Given an incoming view key, extract the coin\'s nonce, diversifier, value, and memo"},
{"lineNum":"   81","line":"\tIdentifiedCoinData identify(const IncomingViewKey& incoming_view_key);"},
{"lineNum":"   82","line":""},
{"lineNum":"   83","line":"\t// Given a full view key, extract the coin\'s serial number and tag"},
{"lineNum":"   84","line":"\tRecoveredCoinData recover(const FullViewKey& full_view_key, const IdentifiedCoinData& data);"},
{"lineNum":"   85","line":""},
{"lineNum":"   86","line":"    static std::size_t memoryRequired();"},
{"lineNum":"   87","line":""},
{"lineNum":"   88","line":"    bool operator==(const Coin& other) const;"},
{"lineNum":"   89","line":""},
{"lineNum":"   90","line":"    // type and v are not included in hash"},
{"lineNum":"   91","line":"    uint256 getHash() const;"},
{"lineNum":"   92","line":""},
{"lineNum":"   93","line":"    void setSerialContext(const std::vector<unsigned char>& serial_context_);"},
{"lineNum":"   94","line":"protected:"},
{"lineNum":"   95","line":"\tbool validate(const IncomingViewKey& incoming_view_key, IdentifiedCoinData& data);"},
{"lineNum":"   96","line":""},
{"lineNum":"   97","line":"public:"},
{"lineNum":"   98","line":"\tconst Params* params;"},
{"lineNum":"   99","line":"\tchar type; // type flag"},
{"lineNum":"  100","line":"\tGroupElement S, K, C; // serial commitment, recovery key, value commitment"},
{"lineNum":"  101","line":"\tAEADEncryptedData r_; // encrypted recipient data"},
{"lineNum":"  102","line":"\tuint64_t v; // value"},
{"lineNum":"  103","line":"\tstd::vector<unsigned char> serial_context; // context to which the serial commitment should be bound (not serialized, but inferred)"},
{"lineNum":"  104","line":""},
{"lineNum":"  105","line":"\t// Serialization depends on the coin type"},
{"lineNum":"  106","line":"\tADD_SERIALIZE_METHODS;"},
{"lineNum":"  107","line":"\ttemplate <typename Stream, typename Operation>"},
{"lineNum":"  108","line":"\tinline void SerializationOp(Stream& s, Operation ser_action) {"},
{"lineNum":"  109","line":"\t\tREADWRITE(type);"},
{"lineNum":"  110","line":"\t\tREADWRITE(S);"},
{"lineNum":"  111","line":"\t\tREADWRITE(K);"},
{"lineNum":"  112","line":"\t\tREADWRITE(C);"},
{"lineNum":"  113","line":"\t\tREADWRITE(r_);"},
{"lineNum":"  114","line":""},
{"lineNum":"  115","line":"\t\tif (type == COIN_TYPE_MINT) {"},
{"lineNum":"  116","line":"\t\t\tREADWRITE(v);"},
{"lineNum":"  117","line":"\t\t}"},
{"lineNum":"  118","line":"\t}"},
{"lineNum":"  119","line":"};"},
{"lineNum":"  120","line":""},
{"lineNum":"  121","line":"}"},
{"lineNum":"  122","line":""},
{"lineNum":"  123","line":"#endif"},
]};
var percent_low = 25;var percent_high = 75;
var header = { "command" : "coin_fuzz_debug", "date" : "2023-08-02 12:13:11", "instrumented" : 18, "covered" : 0,};
var merged_data = [];
