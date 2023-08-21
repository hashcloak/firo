var data = {lines:[
{"lineNum":"    1","line":"#ifndef FIRO_SPARK_UTIL_H"},
{"lineNum":"    2","line":"#define FIRO_SPARK_UTIL_H"},
{"lineNum":"    3","line":"#include \"../secp256k1/include/Scalar.h\""},
{"lineNum":"    4","line":"#include \"../secp256k1/include/GroupElement.h\""},
{"lineNum":"    5","line":"#include \"../crypto/aes.h\""},
{"lineNum":"    6","line":"#include \"../streams.h\""},
{"lineNum":"    7","line":"#include \"../version.h\""},
{"lineNum":"    8","line":"#include \"../util.h\""},
{"lineNum":"    9","line":"#include \"kdf.h\""},
{"lineNum":"   10","line":"#include \"hash.h\""},
{"lineNum":"   11","line":""},
{"lineNum":"   12","line":"namespace spark {"},
{"lineNum":"   13","line":""},
{"lineNum":"   14","line":"using namespace secp_primitives;"},
{"lineNum":"   15","line":""},
{"lineNum":"   16","line":"// Useful serialization constant"},
{"lineNum":"   17","line":"const std::size_t SCALAR_ENCODING = 32;"},
{"lineNum":"   18","line":""},
{"lineNum":"   19","line":"// Base protocol separator"},
{"lineNum":"   20","line":"const std::string LABEL_PROTOCOL = \"SPARK\";","class":"lineCov","hits":"1","order":"25",},
{"lineNum":"   21","line":""},
{"lineNum":"   22","line":"// All hash operations have a mode flag to separate their use cases"},
{"lineNum":"   23","line":"const unsigned char HASH_MODE_TRANSCRIPT = 0; // a Fiat-Shamir transcript"},
{"lineNum":"   24","line":"const unsigned char HASH_MODE_GROUP_GENERATOR = 1; // a prime-order group generator derived from a label"},
{"lineNum":"   25","line":"const unsigned char HASH_MODE_FUNCTION = 2; // a hash function derived from a label"},
{"lineNum":"   26","line":"const unsigned char HASH_MODE_KDF = 3; // a key derivation function derived from a label"},
{"lineNum":"   27","line":""},
{"lineNum":"   28","line":"// Transcript labels"},
{"lineNum":"   29","line":"const std::string LABEL_TRANSCRIPT_BPPLUS = \"BULLETPROOF_PLUS_V1\";","class":"lineCov","hits":"1","order":"27",},
{"lineNum":"   30","line":"const std::string LABEL_TRANSCRIPT_CHAUM = \"CHAUM_V1\";","class":"lineCov","hits":"1","order":"28",},
{"lineNum":"   31","line":"const std::string LABEL_TRANSCRIPT_GROOTLE = \"GROOTLE_V1\";","class":"lineCov","hits":"1","order":"29",},
{"lineNum":"   32","line":"const std::string LABEL_TRANSCRIPT_SCHNORR = \"SCHNORR_V1\";","class":"lineCov","hits":"1","order":"31",},
{"lineNum":"   33","line":""},
{"lineNum":"   34","line":"// Generator labels"},
{"lineNum":"   35","line":"const std::string LABEL_GENERATOR_F = \"F\";","class":"lineCov","hits":"1","order":"32",},
{"lineNum":"   36","line":"const std::string LABEL_GENERATOR_H = \"H\";","class":"lineCov","hits":"1","order":"33",},
{"lineNum":"   37","line":"const std::string LABEL_GENERATOR_U = \"U\";","class":"lineCov","hits":"1","order":"34",},
{"lineNum":"   38","line":"const std::string LABEL_GENERATOR_G_RANGE = \"G_RANGE\";","class":"lineCov","hits":"1","order":"35",},
{"lineNum":"   39","line":"const std::string LABEL_GENERATOR_H_RANGE = \"H_RANGE\";","class":"lineCov","hits":"1","order":"36",},
{"lineNum":"   40","line":"const std::string LABEL_GENERATOR_G_GROOTLE = \"G_GROOTLE\";","class":"lineCov","hits":"1","order":"37",},
{"lineNum":"   41","line":"const std::string LABEL_GENERATOR_H_GROOTLE = \"H_GROOTLE\";","class":"lineCov","hits":"1","order":"38",},
{"lineNum":"   42","line":""},
{"lineNum":"   43","line":"// Hash function labels"},
{"lineNum":"   44","line":"const std::string LABEL_HASH_DIV = \"DIV\";","class":"lineCov","hits":"1","order":"30",},
{"lineNum":"   45","line":"const std::string LABEL_HASH_Q2 = \"Q2\";","class":"lineCov","hits":"1","order":"23",},
{"lineNum":"   46","line":"const std::string LABEL_HASH_K = \"K\";","class":"lineCov","hits":"1","order":"22",},
{"lineNum":"   47","line":"const std::string LABEL_HASH_SER = \"SER\";","class":"lineCov","hits":"1","order":"21",},
{"lineNum":"   48","line":"const std::string LABEL_HASH_VAL = \"VAL\";","class":"lineCov","hits":"1","order":"20",},
{"lineNum":"   49","line":"const std::string LABEL_HASH_SER1 = \"SER1\";","class":"lineCov","hits":"1","order":"24",},
{"lineNum":"   50","line":"const std::string LABEL_HASH_VAL1 = \"VAL1\";","class":"lineCov","hits":"1","order":"19",},
{"lineNum":"   51","line":"const std::string LABEL_HASH_BIND = \"BIND\";","class":"lineCov","hits":"1","order":"18",},
{"lineNum":"   52","line":"const std::string LABEL_F4GRUMBLE_G = \"SPARK_F4GRUMBLE_G\";","class":"lineCov","hits":"1","order":"17",},
{"lineNum":"   53","line":"const std::string LABEL_F4GRUMBLE_H = \"SPARK_F4GRUMBLE_H\";","class":"lineCov","hits":"1","order":"16",},
{"lineNum":"   54","line":""},
{"lineNum":"   55","line":"// KDF labels"},
{"lineNum":"   56","line":"const std::string LABEL_KDF_DIVERSIFIER = \"DIVERSIFIER\";","class":"lineCov","hits":"1","order":"15",},
{"lineNum":"   57","line":"const std::string LABEL_KDF_AEAD = \"AEAD\";","class":"lineCov","hits":"1","order":"14",},
{"lineNum":"   58","line":"const std::string LABEL_COMMIT_AEAD = \"COMMIT_AEAD\";","class":"lineCov","hits":"1","order":"26",},
{"lineNum":"   59","line":""},
{"lineNum":"   60","line":"// AEAD constants"},
{"lineNum":"   61","line":"const int AEAD_IV_SIZE = 12; // byte length of the IV"},
{"lineNum":"   62","line":"const int AEAD_KEY_SIZE = 32; // byte length of the key"},
{"lineNum":"   63","line":"const int AEAD_TAG_SIZE = 16; // byte length of the tag"},
{"lineNum":"   64","line":"const int AEAD_COMMIT_SIZE = 32; // byte length of the key commitment"},
{"lineNum":"   65","line":""},
{"lineNum":"   66","line":"// Address encoding prefix"},
{"lineNum":"   67","line":"const unsigned char ADDRESS_ENCODING_PREFIX = \'p\';"},
{"lineNum":"   68","line":""},
{"lineNum":"   69","line":"// Address encoding network identifiers"},
{"lineNum":"   70","line":"// TODO: Extend/update/replace these as needed! These are just initial examples"},
{"lineNum":"   71","line":"const unsigned char ADDRESS_NETWORK_MAINNET = \'m\';"},
{"lineNum":"   72","line":"const unsigned char ADDRESS_NETWORK_TESTNET = \'t\';"},
{"lineNum":"   73","line":"const unsigned char ADDRESS_NETWORK_REGTEST = \'r\';"},
{"lineNum":"   74","line":"const unsigned char ADDRESS_NETWORK_DEVNET =  \'d\';"},
{"lineNum":"   75","line":""},
{"lineNum":"   76","line":"class SparkUtils {"},
{"lineNum":"   77","line":"public:"},
{"lineNum":"   78","line":"    // Protocol-level hash functions"},
{"lineNum":"   79","line":"    static GroupElement hash_generator(const std::string label);"},
{"lineNum":"   80","line":""},
{"lineNum":"   81","line":"    // Hash functions"},
{"lineNum":"   82","line":"    static GroupElement hash_div(const std::vector<unsigned char>& d);"},
{"lineNum":"   83","line":"    static Scalar hash_Q2(const Scalar& s1, const Scalar& i);"},
{"lineNum":"   84","line":"    static Scalar hash_k(const Scalar& k);"},
{"lineNum":"   85","line":"    static Scalar hash_ser(const Scalar& k, const std::vector<unsigned char>& serial_context);"},
{"lineNum":"   86","line":"    static Scalar hash_val(const Scalar& k);"},
{"lineNum":"   87","line":"    static Scalar hash_ser1(const Scalar& s, const GroupElement& D);"},
{"lineNum":"   88","line":"    static Scalar hash_val1(const Scalar& s, const GroupElement& D);"},
{"lineNum":"   89","line":""},
{"lineNum":"   90","line":"    // Key derivation functions"},
{"lineNum":"   91","line":"    static std::vector<unsigned char> kdf_diversifier(const Scalar& s1);"},
{"lineNum":"   92","line":"    static std::vector<unsigned char> kdf_aead(const GroupElement& K_der);"},
{"lineNum":"   93","line":"    static std::vector<unsigned char> commit_aead(const GroupElement& K_der);"},
{"lineNum":"   94","line":""},
{"lineNum":"   95","line":"    // Diversifier encryption/decryption"},
{"lineNum":"   96","line":"    static std::vector<unsigned char> diversifier_encrypt(const std::vector<unsigned char>& key, const uint64_t i);"},
{"lineNum":"   97","line":"    static uint64_t diversifier_decrypt(const std::vector<unsigned char>& key, const std::vector<unsigned char>& d);"},
{"lineNum":"   98","line":"};"},
{"lineNum":"   99","line":""},
{"lineNum":"  100","line":"}"},
{"lineNum":"  101","line":""},
{"lineNum":"  102","line":"#endif"},
]};
var percent_low = 25;var percent_high = 75;
var header = { "command" : "", "date" : "2023-08-02 12:13:12", "instrumented" : 25, "covered" : 25,};
var merged_data = [];
