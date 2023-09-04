var data = {lines:[
{"lineNum":"    1","line":"#ifndef FIRO_SPARK_KEYS_H"},
{"lineNum":"    2","line":"#define FIRO_SPARK_KEYS_H"},
{"lineNum":"    3","line":"#include \"bech32.h\""},
{"lineNum":"    4","line":"#include \"f4grumble.h\""},
{"lineNum":"    5","line":"#include \"params.h\""},
{"lineNum":"    6","line":"#include \"util.h\""},
{"lineNum":"    7","line":""},
{"lineNum":"    8","line":"namespace spark {"},
{"lineNum":"    9","line":""},
{"lineNum":"   10","line":"// Let\'s define inital spark address version as P (private),"},
{"lineNum":"   11","line":"const char SPARK_ADDRESS_VERSION = \'P\';"},
{"lineNum":"   12","line":""},
{"lineNum":"   13","line":"using namespace secp_primitives;"},
{"lineNum":"   14","line":""},
{"lineNum":"   15","line":"class SpendKey {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   16","line":"public:"},
{"lineNum":"   17","line":"\tSpendKey(const Params* params);"},
{"lineNum":"   18","line":"    SpendKey(const Params* params, const Scalar& r_);"},
{"lineNum":"   19","line":"\tconst Params* get_params() const;"},
{"lineNum":"   20","line":"\tconst Scalar& get_s1() const;"},
{"lineNum":"   21","line":"\tconst Scalar& get_s2() const;"},
{"lineNum":"   22","line":"\tconst Scalar& get_r() const;"},
{"lineNum":"   23","line":""},
{"lineNum":"   24","line":"    SpendKey& operator=(const SpendKey& other);"},
{"lineNum":"   25","line":"    bool operator==(const SpendKey& other) const;"},
{"lineNum":"   26","line":""},
{"lineNum":"   27","line":"private:"},
{"lineNum":"   28","line":"\tconst Params* params;"},
{"lineNum":"   29","line":"\tScalar s1, s2, r;"},
{"lineNum":"   30","line":"};"},
{"lineNum":"   31","line":""},
{"lineNum":"   32","line":"class FullViewKey {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   33","line":"public:"},
{"lineNum":"   34","line":"\tFullViewKey();"},
{"lineNum":"   35","line":"    FullViewKey(const Params* params);"},
{"lineNum":"   36","line":"\tFullViewKey(const SpendKey& spend_key);"},
{"lineNum":"   37","line":"\tconst Params* get_params() const;"},
{"lineNum":"   38","line":"\tconst Scalar& get_s1() const;"},
{"lineNum":"   39","line":"\tconst Scalar& get_s2() const;"},
{"lineNum":"   40","line":"\tconst GroupElement& get_D() const;"},
{"lineNum":"   41","line":"\tconst GroupElement& get_P2() const;"},
{"lineNum":"   42","line":""},
{"lineNum":"   43","line":""},
{"lineNum":"   44","line":"    ADD_SERIALIZE_METHODS;"},
{"lineNum":"   45","line":"    template <typename Stream, typename Operation>"},
{"lineNum":"   46","line":"    inline void SerializationOp(Stream& s, Operation ser_action) {"},
{"lineNum":"   47","line":"        READWRITE(s1);"},
{"lineNum":"   48","line":"        READWRITE(s2);"},
{"lineNum":"   49","line":"        READWRITE(D);"},
{"lineNum":"   50","line":"        READWRITE(P2);"},
{"lineNum":"   51","line":"    }"},
{"lineNum":"   52","line":""},
{"lineNum":"   53","line":"private:"},
{"lineNum":"   54","line":"\tconst Params* params;"},
{"lineNum":"   55","line":"\tScalar s1, s2;"},
{"lineNum":"   56","line":"\tGroupElement D, P2;"},
{"lineNum":"   57","line":"};"},
{"lineNum":"   58","line":""},
{"lineNum":"   59","line":"class IncomingViewKey {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   60","line":"public:"},
{"lineNum":"   61","line":"\tIncomingViewKey();"},
{"lineNum":"   62","line":"    IncomingViewKey(const Params* params);"},
{"lineNum":"   63","line":"\tIncomingViewKey(const FullViewKey& full_view_key);"},
{"lineNum":"   64","line":"\tconst Params* get_params() const;"},
{"lineNum":"   65","line":"\tconst Scalar& get_s1() const;"},
{"lineNum":"   66","line":"\tconst GroupElement& get_P2() const;"},
{"lineNum":"   67","line":"\tuint64_t get_diversifier(const std::vector<unsigned char>& d) const;"},
{"lineNum":"   68","line":""},
{"lineNum":"   69","line":"private:"},
{"lineNum":"   70","line":"\tconst Params* params;"},
{"lineNum":"   71","line":"\tScalar s1;"},
{"lineNum":"   72","line":"\tGroupElement P2;"},
{"lineNum":"   73","line":"};"},
{"lineNum":"   74","line":""},
{"lineNum":"   75","line":"class Address {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   76","line":"public:"},
{"lineNum":"   77","line":"    Address();"},
{"lineNum":"   78","line":"\tAddress(const Params* params);"},
{"lineNum":"   79","line":"\tAddress(const IncomingViewKey& incoming_view_key, const uint64_t i);"},
{"lineNum":"   80","line":"\tconst Params* get_params() const;"},
{"lineNum":"   81","line":"\tconst std::vector<unsigned char>& get_d() const;"},
{"lineNum":"   82","line":"\tconst GroupElement& get_Q1() const;"},
{"lineNum":"   83","line":"\tconst GroupElement& get_Q2() const;"},
{"lineNum":"   84","line":"    std::string GetHex() const;"},
{"lineNum":"   85","line":"    void SetHex(const std::string& str);"},
{"lineNum":"   86","line":""},
{"lineNum":"   87","line":"\tstd::string encode(const unsigned char network) const;"},
{"lineNum":"   88","line":"\tunsigned char decode(const std::string& str);"},
{"lineNum":"   89","line":""},
{"lineNum":"   90","line":"private:"},
{"lineNum":"   91","line":"    char version = SPARK_ADDRESS_VERSION;","class":"linePartCov","hits":"1","order":"853","possible_hits":"3",},
{"lineNum":"   92","line":"\tconst Params* params;"},
{"lineNum":"   93","line":"\tstd::vector<unsigned char> d;"},
{"lineNum":"   94","line":"\tGroupElement Q1, Q2;"},
{"lineNum":"   95","line":""},
{"lineNum":"   96","line":"\tstatic std::string get_checksum(const std::string data);"},
{"lineNum":"   97","line":"};"},
{"lineNum":"   98","line":""},
{"lineNum":"   99","line":"}"},
{"lineNum":"  100","line":""},
{"lineNum":"  101","line":"#endif"},
]};
var percent_low = 25;var percent_high = 75;
var header = { "command" : "coin_debug", "date" : "2023-08-28 08:52:11", "instrumented" : 5, "covered" : 1,};
var merged_data = [];
