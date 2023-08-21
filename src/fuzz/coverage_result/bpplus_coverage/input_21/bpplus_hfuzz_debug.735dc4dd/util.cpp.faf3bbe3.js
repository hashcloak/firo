var data = {lines:[
{"lineNum":"    1","line":"#include \"util.h\""},
{"lineNum":"    2","line":""},
{"lineNum":"    3","line":"namespace spark {"},
{"lineNum":"    4","line":""},
{"lineNum":"    5","line":"using namespace secp_primitives;"},
{"lineNum":"    6","line":""},
{"lineNum":"    7","line":"// Encrypt a diversifier using AES-256"},
{"lineNum":"    8","line":"std::vector<unsigned char> SparkUtils::diversifier_encrypt(const std::vector<unsigned char>& key, const uint64_t i) {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"    9","line":"    // Serialize the diversifier"},
{"lineNum":"   10","line":"    CDataStream i_stream(SER_NETWORK, PROTOCOL_VERSION);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   11","line":"    i_stream << i;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   12","line":""},
{"lineNum":"   13","line":"    // Assert proper sizes"},
{"lineNum":"   14","line":"    if (key.size() != AES256_KEYSIZE) {","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   15","line":"        throw std::invalid_argument(\"Bad diversifier encryption key size\");","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   16","line":"    }"},
{"lineNum":"   17","line":""},
{"lineNum":"   18","line":"    // Encrypt using padded AES-256 (CBC) using a zero IV"},
{"lineNum":"   19","line":"    std::vector<unsigned char> ciphertext;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   20","line":"    ciphertext.resize(AES_BLOCKSIZE);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   21","line":"    std::vector<unsigned char> iv;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   22","line":"    iv.resize(AES_BLOCKSIZE);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   23","line":""},
{"lineNum":"   24","line":"    AES256CBCEncrypt aes(key.data(), iv.data(), true);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   25","line":"    aes.Encrypt(reinterpret_cast<unsigned char *>(i_stream.data()), i_stream.size(), ciphertext.data());","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   26","line":""},
{"lineNum":"   27","line":"    return ciphertext;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   28","line":"}","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   29","line":""},
{"lineNum":"   30","line":"// Decrypt a diversifier using AES-256"},
{"lineNum":"   31","line":"uint64_t SparkUtils::diversifier_decrypt(const std::vector<unsigned char>& key, const std::vector<unsigned char>& d) {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   32","line":"    // Assert proper sizes"},
{"lineNum":"   33","line":"    if (key.size() != AES256_KEYSIZE) {","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   34","line":"        throw std::invalid_argument(\"Bad diversifier decryption key size\");","class":"lineNoCov","hits":"0","possible_hits":"4",},
{"lineNum":"   35","line":"    }"},
{"lineNum":"   36","line":""},
{"lineNum":"   37","line":"    // Decrypt using padded AES-256 (CBC) using a zero IV"},
{"lineNum":"   38","line":"    CDataStream i_stream(SER_NETWORK, PROTOCOL_VERSION);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   39","line":"    i_stream.resize(sizeof(uint64_t));","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   40","line":""},
{"lineNum":"   41","line":"    std::vector<unsigned char> iv;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   42","line":"    iv.resize(AES_BLOCKSIZE);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   43","line":""},
{"lineNum":"   44","line":"    AES256CBCDecrypt aes(key.data(), iv.data(), true);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   45","line":"    aes.Decrypt(d.data(), d.size(), reinterpret_cast<unsigned char *>(i_stream.data()));","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   46","line":""},
{"lineNum":"   47","line":"    // Deserialize the diversifier"},
{"lineNum":"   48","line":"    uint64_t i;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   49","line":"    i_stream >> i;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   50","line":""},
{"lineNum":"   51","line":"    return i;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   52","line":"}","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   53","line":""},
{"lineNum":"   54","line":"// Produce a uniformly-sampled group element from a label"},
{"lineNum":"   55","line":"GroupElement SparkUtils::hash_generator(const std::string label) {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   56","line":"\tconst int GROUP_ENCODING = 34;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   57","line":"\tconst unsigned char ZERO = 0;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   58","line":""},
{"lineNum":"   59","line":"    // Ensure we can properly populate a"},
{"lineNum":"   60","line":"    if (EVP_MD_size(EVP_blake2b512()) < GROUP_ENCODING) {","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   61","line":"        throw std::runtime_error(\"Bad hash size!\");","class":"lineNoCov","hits":"0","possible_hits":"4",},
{"lineNum":"   62","line":"    }"},
{"lineNum":"   63","line":""},
{"lineNum":"   64","line":"    EVP_MD_CTX* ctx;"},
{"lineNum":"   65","line":"    ctx = EVP_MD_CTX_new();","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   66","line":"    EVP_DigestInit_ex(ctx, EVP_blake2b512(), NULL);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   67","line":""},
{"lineNum":"   68","line":"    // Write the protocol and mode"},
{"lineNum":"   69","line":"    std::vector<unsigned char> protocol(LABEL_PROTOCOL.begin(), LABEL_PROTOCOL.end());","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   70","line":"    EVP_DigestUpdate(ctx, protocol.data(), protocol.size());","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   71","line":"    EVP_DigestUpdate(ctx, &HASH_MODE_GROUP_GENERATOR, sizeof(HASH_MODE_GROUP_GENERATOR));","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   72","line":""},
{"lineNum":"   73","line":"    // Write the label"},
{"lineNum":"   74","line":"    std::vector<unsigned char> bytes(label.begin(), label.end());","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   75","line":"    EVP_DigestUpdate(ctx, bytes.data(), bytes.size());","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   76","line":""},
{"lineNum":"   77","line":"    std::vector<unsigned char> hash;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   78","line":"    hash.resize(EVP_MD_size(EVP_blake2b512()));","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   79","line":"    unsigned char counter = 0;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   80","line":""},
{"lineNum":"   81","line":"    EVP_MD_CTX* state_counter;"},
{"lineNum":"   82","line":"    state_counter = EVP_MD_CTX_new();","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   83","line":"    EVP_DigestInit_ex(state_counter, EVP_blake2b512(), NULL);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   84","line":""},
{"lineNum":"   85","line":"    EVP_MD_CTX* state_finalize;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   86","line":"    state_finalize = EVP_MD_CTX_new();","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   87","line":"    EVP_DigestInit_ex(state_finalize, EVP_blake2b512(), NULL);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   88","line":""},
{"lineNum":"   89","line":"    // Finalize the hash"},
{"lineNum":"   90","line":"    while (1) {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   91","line":"        // Prepare temporary state for counter testing"},
{"lineNum":"   92","line":"        EVP_MD_CTX_copy_ex(state_counter, ctx);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   93","line":""},
{"lineNum":"   94","line":"        // Embed the counter"},
{"lineNum":"   95","line":"        EVP_DigestUpdate(state_counter, &counter, sizeof(counter));","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   96","line":""},
{"lineNum":"   97","line":"        // Finalize the hash with a temporary state"},
{"lineNum":"   98","line":"        EVP_MD_CTX_copy_ex(state_finalize, state_counter);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   99","line":"        unsigned int TEMP; // We already know the digest length!","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  100","line":"        EVP_DigestFinal_ex(state_finalize, hash.data(), &TEMP);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  101","line":""},
{"lineNum":"  102","line":"        // Assemble the serialized input:"},
{"lineNum":"  103","line":"\t\t//\tbytes 0..31: x coordinate"},
{"lineNum":"  104","line":"\t\t//\tbyte 32: even/odd"},
{"lineNum":"  105","line":"\t\t//\tbyte 33: zero (this point is not infinity)"},
{"lineNum":"  106","line":"\t\tunsigned char candidate_bytes[GROUP_ENCODING];","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  107","line":"\t\tmemcpy(candidate_bytes, hash.data(), 33);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  108","line":"\t\tmemcpy(candidate_bytes + 33, &ZERO, 1);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  109","line":"        GroupElement candidate;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  110","line":"        try {"},
{"lineNum":"  111","line":"            candidate.deserialize(candidate_bytes);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  112","line":""},
{"lineNum":"  113","line":"            // Deserialization can succeed even with an invalid result"},
{"lineNum":"  114","line":"            if (!candidate.isMember()) {","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  115","line":"                counter++;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  116","line":"                continue;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  117","line":"            }"},
{"lineNum":"  118","line":""},
{"lineNum":"  119","line":"            EVP_MD_CTX_free(ctx);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  120","line":"            EVP_MD_CTX_free(state_counter);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  121","line":"            EVP_MD_CTX_free(state_finalize);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  122","line":""},
{"lineNum":"  123","line":"            return candidate;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  124","line":"        } catch (...) {","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  125","line":"            counter++;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  126","line":"        }","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  127","line":"    }","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  128","line":"}","class":"lineNoCov","hits":"0","possible_hits":"6",},
{"lineNum":"  129","line":""},
{"lineNum":"  130","line":"// Derive an AES key for diversifier encryption/decryption"},
{"lineNum":"  131","line":"std::vector<unsigned char> SparkUtils::kdf_diversifier(const Scalar& s1) {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  132","line":"    KDF kdf(LABEL_KDF_DIVERSIFIER, AES256_KEYSIZE);","class":"lineNoCov","hits":"0","possible_hits":"4",},
{"lineNum":"  133","line":""},
{"lineNum":"  134","line":"    CDataStream stream(SER_NETWORK, PROTOCOL_VERSION);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  135","line":"    stream << s1;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  136","line":"    kdf.include(stream);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  137","line":""},
{"lineNum":"  138","line":"    return kdf.finalize();","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  139","line":"}","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  140","line":""},
{"lineNum":"  141","line":"// Derive a ChaCha20 key for AEAD operations"},
{"lineNum":"  142","line":"std::vector<unsigned char> SparkUtils::kdf_aead(const GroupElement& K_der) {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  143","line":"    KDF kdf(LABEL_KDF_AEAD, AEAD_KEY_SIZE);","class":"lineNoCov","hits":"0","possible_hits":"4",},
{"lineNum":"  144","line":""},
{"lineNum":"  145","line":"    CDataStream stream(SER_NETWORK, PROTOCOL_VERSION);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  146","line":"    stream << K_der;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  147","line":"    kdf.include(stream);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  148","line":""},
{"lineNum":"  149","line":"    return kdf.finalize();","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  150","line":"}","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  151","line":""},
{"lineNum":"  152","line":"// Derive a ChaCha20 key commitment for AEAD operations"},
{"lineNum":"  153","line":"std::vector<unsigned char> SparkUtils::commit_aead(const GroupElement& K_der) {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  154","line":"    // We use a KDF here because of the output size"},
{"lineNum":"  155","line":"    KDF kdf(LABEL_COMMIT_AEAD, AEAD_COMMIT_SIZE);","class":"lineNoCov","hits":"0","possible_hits":"4",},
{"lineNum":"  156","line":""},
{"lineNum":"  157","line":"    CDataStream stream(SER_NETWORK, PROTOCOL_VERSION);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  158","line":"    stream << K_der;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  159","line":"    kdf.include(stream);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  160","line":""},
{"lineNum":"  161","line":"    return kdf.finalize();","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  162","line":"}","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  163","line":""},
{"lineNum":"  164","line":"// Hash-to-group function H_div"},
{"lineNum":"  165","line":"GroupElement SparkUtils::hash_div(const std::vector<unsigned char>& d) {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  166","line":"    Hash hash(LABEL_HASH_DIV);","class":"lineNoCov","hits":"0","possible_hits":"4",},
{"lineNum":"  167","line":""},
{"lineNum":"  168","line":"    CDataStream stream(SER_NETWORK, PROTOCOL_VERSION);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  169","line":"    stream << d;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  170","line":"    hash.include(stream);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  171","line":""},
{"lineNum":"  172","line":"    return hash.finalize_group();","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  173","line":"}","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  174","line":""},
{"lineNum":"  175","line":"// Hash-to-scalar function H_Q2"},
{"lineNum":"  176","line":"Scalar SparkUtils::hash_Q2(const Scalar& s1, const Scalar& i) {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  177","line":"    Hash hash(LABEL_HASH_Q2);","class":"lineNoCov","hits":"0","possible_hits":"4",},
{"lineNum":"  178","line":""},
{"lineNum":"  179","line":"    CDataStream stream(SER_NETWORK, PROTOCOL_VERSION);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  180","line":"    stream << s1;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  181","line":"    stream << i;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  182","line":"    hash.include(stream);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  183","line":""},
{"lineNum":"  184","line":"    return hash.finalize_scalar();","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  185","line":"}","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  186","line":""},
{"lineNum":"  187","line":"// Hash-to-scalar function H_k"},
{"lineNum":"  188","line":"Scalar SparkUtils::hash_k(const Scalar& k) {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  189","line":"    Hash hash(LABEL_HASH_K);","class":"lineNoCov","hits":"0","possible_hits":"4",},
{"lineNum":"  190","line":""},
{"lineNum":"  191","line":"    CDataStream stream(SER_NETWORK, PROTOCOL_VERSION);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  192","line":"    stream << k;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  193","line":"    hash.include(stream);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  194","line":""},
{"lineNum":"  195","line":"    return hash.finalize_scalar();","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  196","line":"}","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  197","line":""},
{"lineNum":"  198","line":"// Hash-to-scalar function H_ser"},
{"lineNum":"  199","line":"Scalar SparkUtils::hash_ser(const Scalar& k, const std::vector<unsigned char>& serial_context) {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  200","line":"    Hash hash(LABEL_HASH_SER);","class":"lineNoCov","hits":"0","possible_hits":"4",},
{"lineNum":"  201","line":""},
{"lineNum":"  202","line":"    CDataStream stream(SER_NETWORK, PROTOCOL_VERSION);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  203","line":"    stream << k;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  204","line":"    stream << serial_context;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  205","line":"    hash.include(stream);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  206","line":""},
{"lineNum":"  207","line":"    return hash.finalize_scalar();","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  208","line":"}","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  209","line":""},
{"lineNum":"  210","line":"// Hash-to-scalar function H_val"},
{"lineNum":"  211","line":"Scalar SparkUtils::hash_val(const Scalar& k) {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  212","line":"    Hash hash(LABEL_HASH_VAL);","class":"lineNoCov","hits":"0","possible_hits":"4",},
{"lineNum":"  213","line":""},
{"lineNum":"  214","line":"    CDataStream stream(SER_NETWORK, PROTOCOL_VERSION);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  215","line":"    stream << k;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  216","line":"    hash.include(stream);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  217","line":""},
{"lineNum":"  218","line":"    return hash.finalize_scalar();","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  219","line":"}","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  220","line":""},
{"lineNum":"  221","line":"// Hash-to-scalar function H_ser1"},
{"lineNum":"  222","line":"Scalar SparkUtils::hash_ser1(const Scalar& s, const GroupElement& D) {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  223","line":"    Hash hash(LABEL_HASH_SER1);","class":"lineNoCov","hits":"0","possible_hits":"4",},
{"lineNum":"  224","line":""},
{"lineNum":"  225","line":"    CDataStream stream(SER_NETWORK, PROTOCOL_VERSION);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  226","line":"    stream << s;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  227","line":"    stream << D;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  228","line":"    hash.include(stream);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  229","line":""},
{"lineNum":"  230","line":"    return hash.finalize_scalar();","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  231","line":"}","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  232","line":""},
{"lineNum":"  233","line":"// Hash-to-scalar function H_val1"},
{"lineNum":"  234","line":"Scalar SparkUtils::hash_val1(const Scalar& s, const GroupElement& D) {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  235","line":"    Hash hash(LABEL_HASH_VAL1);","class":"lineNoCov","hits":"0","possible_hits":"4",},
{"lineNum":"  236","line":""},
{"lineNum":"  237","line":"    CDataStream stream(SER_NETWORK, PROTOCOL_VERSION);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  238","line":"    stream << s;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  239","line":"    stream << D;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  240","line":"    hash.include(stream);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  241","line":""},
{"lineNum":"  242","line":"    return hash.finalize_scalar();","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  243","line":"}","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  244","line":""},
{"lineNum":"  245","line":"}"},
]};
var percent_low = 25;var percent_high = 75;
var header = { "command" : "bpplus_hfuzz_debug", "date" : "2023-08-17 17:18:24", "instrumented" : 143, "covered" : 0,};
var merged_data = [];
