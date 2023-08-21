var data = {lines:[
{"lineNum":"    1","line":"#include \"hash.h\""},
{"lineNum":"    2","line":""},
{"lineNum":"    3","line":"namespace spark {"},
{"lineNum":"    4","line":""},
{"lineNum":"    5","line":"using namespace secp_primitives;"},
{"lineNum":"    6","line":""},
{"lineNum":"    7","line":"// Set up a labeled hash function"},
{"lineNum":"    8","line":"Hash::Hash(const std::string label) {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"    9","line":"\tthis->ctx = EVP_MD_CTX_new();","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   10","line":"\tEVP_DigestInit_ex(this->ctx, EVP_blake2b512(), NULL);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   11","line":""},
{"lineNum":"   12","line":"\t// Write the protocol and mode information"},
{"lineNum":"   13","line":"\tstd::vector<unsigned char> protocol(LABEL_PROTOCOL.begin(), LABEL_PROTOCOL.end());","class":"lineNoCov","hits":"0","possible_hits":"4",},
{"lineNum":"   14","line":"\tEVP_DigestUpdate(this->ctx, protocol.data(), protocol.size());","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   15","line":"\tEVP_DigestUpdate(this->ctx, &HASH_MODE_FUNCTION, sizeof(HASH_MODE_FUNCTION));","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   16","line":""},
{"lineNum":"   17","line":"\t// Include the label with size"},
{"lineNum":"   18","line":"\tinclude_size(label.size());","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   19","line":"\tstd::vector<unsigned char> label_bytes(label.begin(), label.end());","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   20","line":"\tEVP_DigestUpdate(this->ctx, label_bytes.data(), label_bytes.size());","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   21","line":"}","class":"lineNoCov","hits":"0","possible_hits":"3",},
{"lineNum":"   22","line":""},
{"lineNum":"   23","line":"// Clean up"},
{"lineNum":"   24","line":"Hash::~Hash() {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   25","line":"\tEVP_MD_CTX_free(this->ctx);","class":"lineNoCov","hits":"0","possible_hits":"3",},
{"lineNum":"   26","line":"}","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   27","line":""},
{"lineNum":"   28","line":"// Include serialized data in the hash function"},
{"lineNum":"   29","line":"void Hash::include(CDataStream& data) {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   30","line":"\tinclude_size(data.size());","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   31","line":"\tEVP_DigestUpdate(this->ctx, reinterpret_cast<unsigned char *>(data.data()), data.size());","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   32","line":"}","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   33","line":""},
{"lineNum":"   34","line":"// Finalize the hash function to a scalar"},
{"lineNum":"   35","line":"Scalar Hash::finalize_scalar() {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   36","line":"    // Ensure we can properly populate a scalar"},
{"lineNum":"   37","line":"    if (EVP_MD_size(EVP_blake2b512()) < SCALAR_ENCODING) {","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   38","line":"        throw std::runtime_error(\"Bad hash size!\");","class":"lineNoCov","hits":"0","possible_hits":"4",},
{"lineNum":"   39","line":"    }"},
{"lineNum":"   40","line":""},
{"lineNum":"   41","line":"    std::vector<unsigned char> hash;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   42","line":"    hash.resize(EVP_MD_size(EVP_blake2b512()));","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   43","line":"    unsigned char counter = 0;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   44","line":""},
{"lineNum":"   45","line":"    EVP_MD_CTX* state_counter;"},
{"lineNum":"   46","line":"    state_counter = EVP_MD_CTX_new();","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   47","line":"    EVP_DigestInit_ex(state_counter, EVP_blake2b512(), NULL);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   48","line":""},
{"lineNum":"   49","line":"    EVP_MD_CTX* state_finalize;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   50","line":"    state_finalize = EVP_MD_CTX_new();","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   51","line":"    EVP_DigestInit_ex(state_finalize, EVP_blake2b512(), NULL);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   52","line":""},
{"lineNum":"   53","line":"    while (1) {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   54","line":"        // Prepare temporary state for counter testing"},
{"lineNum":"   55","line":"        EVP_MD_CTX_copy_ex(state_counter, this->ctx);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   56","line":""},
{"lineNum":"   57","line":"        // Embed the counter"},
{"lineNum":"   58","line":"        EVP_DigestUpdate(state_counter, &counter, sizeof(counter));","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   59","line":""},
{"lineNum":"   60","line":"        // Finalize the hash with a temporary state"},
{"lineNum":"   61","line":"        EVP_MD_CTX_copy_ex(state_finalize, state_counter);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   62","line":"        unsigned int TEMP; // We already know the digest length!","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   63","line":"        EVP_DigestFinal_ex(state_finalize, hash.data(), &TEMP);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   64","line":""},
{"lineNum":"   65","line":"        // Check for scalar validity"},
{"lineNum":"   66","line":"        Scalar candidate;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   67","line":"        try {"},
{"lineNum":"   68","line":"            candidate.deserialize(hash.data());","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   69","line":""},
{"lineNum":"   70","line":"            EVP_MD_CTX_free(state_counter);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   71","line":"            EVP_MD_CTX_free(state_finalize);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   72","line":""},
{"lineNum":"   73","line":"            return candidate;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   74","line":"        } catch (...) {","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   75","line":"            counter++;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   76","line":"        }","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   77","line":"    }","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   78","line":"}","class":"lineNoCov","hits":"0","possible_hits":"4",},
{"lineNum":"   79","line":""},
{"lineNum":"   80","line":"// Finalize the hash function to a group element"},
{"lineNum":"   81","line":"GroupElement Hash::finalize_group() {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   82","line":"\tconst int GROUP_ENCODING = 34;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   83","line":"\tconst unsigned char ZERO = 0;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   84","line":""},
{"lineNum":"   85","line":"    // Ensure we can properly populate a"},
{"lineNum":"   86","line":"    if (EVP_MD_size(EVP_blake2b512()) < GROUP_ENCODING) {","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   87","line":"        throw std::runtime_error(\"Bad hash size!\");","class":"lineNoCov","hits":"0","possible_hits":"4",},
{"lineNum":"   88","line":"    }"},
{"lineNum":"   89","line":""},
{"lineNum":"   90","line":"    std::vector<unsigned char> hash;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   91","line":"    hash.resize(EVP_MD_size(EVP_blake2b512()));","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   92","line":"    unsigned char counter = 0;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   93","line":""},
{"lineNum":"   94","line":"    EVP_MD_CTX* state_counter;"},
{"lineNum":"   95","line":"    state_counter = EVP_MD_CTX_new();","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   96","line":"    EVP_DigestInit_ex(state_counter, EVP_blake2b512(), NULL);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   97","line":""},
{"lineNum":"   98","line":"    EVP_MD_CTX* state_finalize;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   99","line":"    state_finalize = EVP_MD_CTX_new();","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  100","line":"    EVP_DigestInit_ex(state_finalize, EVP_blake2b512(), NULL);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  101","line":""},
{"lineNum":"  102","line":"    while (1) {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  103","line":"        // Prepare temporary state for counter testing"},
{"lineNum":"  104","line":"        EVP_MD_CTX_copy_ex(state_counter, this->ctx);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  105","line":""},
{"lineNum":"  106","line":"        // Embed the counter"},
{"lineNum":"  107","line":"        EVP_DigestUpdate(state_counter, &counter, sizeof(counter));","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  108","line":""},
{"lineNum":"  109","line":"        // Finalize the hash with a temporary state"},
{"lineNum":"  110","line":"        EVP_MD_CTX_copy_ex(state_finalize, state_counter);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  111","line":"        unsigned int TEMP; // We already know the digest length!","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  112","line":"        EVP_DigestFinal_ex(state_finalize, hash.data(), &TEMP);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  113","line":""},
{"lineNum":"  114","line":"        // Assemble the serialized input:"},
{"lineNum":"  115","line":"\t\t//\tbytes 0..31: x coordinate"},
{"lineNum":"  116","line":"\t\t//\tbyte 32: even/odd"},
{"lineNum":"  117","line":"\t\t//\tbyte 33: zero (this point is not infinity)"},
{"lineNum":"  118","line":"\t\tunsigned char candidate_bytes[GROUP_ENCODING];","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  119","line":"\t\tmemcpy(candidate_bytes, hash.data(), 33);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  120","line":"\t\tmemcpy(candidate_bytes + 33, &ZERO, 1);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  121","line":"        GroupElement candidate;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  122","line":"        try {"},
{"lineNum":"  123","line":"            candidate.deserialize(candidate_bytes);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  124","line":""},
{"lineNum":"  125","line":"            // Deserialization can succeed even with an invalid result"},
{"lineNum":"  126","line":"            if (!candidate.isMember()) {","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  127","line":"                counter++;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  128","line":"                continue;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  129","line":"            }"},
{"lineNum":"  130","line":""},
{"lineNum":"  131","line":"            EVP_MD_CTX_free(state_counter);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  132","line":"            EVP_MD_CTX_free(state_finalize);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  133","line":""},
{"lineNum":"  134","line":"            return candidate;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  135","line":"        } catch (...) {","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  136","line":"            counter++;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  137","line":"        }","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  138","line":"    }","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  139","line":"}","class":"lineNoCov","hits":"0","possible_hits":"4",},
{"lineNum":"  140","line":""},
{"lineNum":"  141","line":"// Include a serialized size in the hash function"},
{"lineNum":"  142","line":"void Hash::include_size(std::size_t size) {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  143","line":"\tCDataStream stream(SER_NETWORK, PROTOCOL_VERSION);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  144","line":"\tstream << size;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  145","line":"\tEVP_DigestUpdate(this->ctx, reinterpret_cast<unsigned char *>(stream.data()), stream.size());","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  146","line":"}","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  147","line":""},
{"lineNum":"  148","line":"}"},
]};
var percent_low = 25;var percent_high = 75;
var header = { "command" : "coin_debug2", "date" : "2023-08-17 10:56:18", "instrumented" : 84, "covered" : 0,};
var merged_data = [];
