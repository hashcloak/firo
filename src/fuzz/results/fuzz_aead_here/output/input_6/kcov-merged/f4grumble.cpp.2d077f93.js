var data = {lines:[
{"lineNum":"    1","line":"// A design for address scrambling based on `f4jumble`: https://zips.z.cash/zip-0316#jumbling"},
{"lineNum":"    2","line":"// This design differs from `f4jumble` to account for OpenSSL limitations on Blake2b"},
{"lineNum":"    3","line":"// These limitations are unfortunate, but such is life sometimes"},
{"lineNum":"    4","line":"//"},
{"lineNum":"    5","line":"// Namely, we have the following dependency limitations on Blake2b:"},
{"lineNum":"    6","line":"// - Output is fixed at either 256 or 512 bits"},
{"lineNum":"    7","line":"// - Personalization is not supported"},
{"lineNum":"    8","line":"//"},
{"lineNum":"    9","line":"// To account for these limitations, we do the following:"},
{"lineNum":"   10","line":"// - Place extra restrictions on length to avoid XOF input encoding (and because we don\'t need it)"},
{"lineNum":"   11","line":"// - Replace personalization with fixed-length inputs; note that length is NOT prepended"},
{"lineNum":"   12","line":"// - Truncate outputs to the proper length"},
{"lineNum":"   13","line":"//"},
{"lineNum":"   14","line":"// Additionally, we account for the number of rounds by limiting the round counter encoding"},
{"lineNum":"   15","line":""},
{"lineNum":"   16","line":"#include \"f4grumble.h\""},
{"lineNum":"   17","line":""},
{"lineNum":"   18","line":"namespace spark {"},
{"lineNum":"   19","line":""},
{"lineNum":"   20","line":"using namespace secp_primitives;"},
{"lineNum":"   21","line":""},
{"lineNum":"   22","line":"// Compute the XOR of two byte vectors"},
{"lineNum":"   23","line":"std::vector<unsigned char> F4Grumble::vec_xor(const std::vector<unsigned char>& x, const std::vector<unsigned char>& y) {","class":"lineNoCov","hits":"0",},
{"lineNum":"   24","line":"    if (x.size() != y.size()) {","class":"lineNoCov","hits":"0",},
{"lineNum":"   25","line":"        throw std::invalid_argument(\"Mismatched vector sizes\");","class":"lineNoCov","hits":"0",},
{"lineNum":"   26","line":"    }"},
{"lineNum":"   27","line":""},
{"lineNum":"   28","line":"    std::vector<unsigned char> result;","class":"lineNoCov","hits":"0",},
{"lineNum":"   29","line":"    result.reserve(x.size());","class":"lineNoCov","hits":"0",},
{"lineNum":"   30","line":"    for (std::size_t i = 0; i < x.size(); i++) {","class":"lineNoCov","hits":"0",},
{"lineNum":"   31","line":"        result.emplace_back(x[i] ^ y[i]);","class":"lineNoCov","hits":"0",},
{"lineNum":"   32","line":"    }","class":"lineNoCov","hits":"0",},
{"lineNum":"   33","line":""},
{"lineNum":"   34","line":"    return result;","class":"lineNoCov","hits":"0",},
{"lineNum":"   35","line":"}","class":"lineNoCov","hits":"0",},
{"lineNum":"   36","line":""},
{"lineNum":"   37","line":"// Return the maximum allowed input size in bytes"},
{"lineNum":"   38","line":"std::size_t F4Grumble::get_max_size() {","class":"lineNoCov","hits":"0",},
{"lineNum":"   39","line":"    return 2 * EVP_MD_size(EVP_blake2b512());","class":"lineNoCov","hits":"0",},
{"lineNum":"   40","line":"}"},
{"lineNum":"   41","line":""},
{"lineNum":"   42","line":"// Instantiate with a given network identifier and expected input length"},
{"lineNum":"   43","line":"F4Grumble::F4Grumble(const unsigned char network, const int l_M) {","class":"lineNoCov","hits":"0",},
{"lineNum":"   44","line":"    // Assert the length is valid"},
{"lineNum":"   45","line":"    if (l_M > 2 * EVP_MD_size(EVP_blake2b512())) {","class":"lineNoCov","hits":"0",},
{"lineNum":"   46","line":"        throw std::invalid_argument(\"Bad address size\");","class":"lineNoCov","hits":"0",},
{"lineNum":"   47","line":"    }"},
{"lineNum":"   48","line":""},
{"lineNum":"   49","line":"    this->network = network;","class":"lineNoCov","hits":"0",},
{"lineNum":"   50","line":"    this->l_M = l_M;","class":"lineNoCov","hits":"0",},
{"lineNum":"   51","line":"    this->l_L = l_M / 2;","class":"lineNoCov","hits":"0",},
{"lineNum":"   52","line":"    this->l_R = l_M - l_L;","class":"lineNoCov","hits":"0",},
{"lineNum":"   53","line":"}","class":"lineNoCov","hits":"0",},
{"lineNum":"   54","line":""},
{"lineNum":"   55","line":"// Encode the input data"},
{"lineNum":"   56","line":"std::vector<unsigned char> F4Grumble::encode(const std::vector<unsigned char>& input) {","class":"lineNoCov","hits":"0",},
{"lineNum":"   57","line":"    // Check the input size"},
{"lineNum":"   58","line":"    if (input.size() != l_M) {","class":"lineNoCov","hits":"0",},
{"lineNum":"   59","line":"        throw std::invalid_argument(\"Bad address size\");","class":"lineNoCov","hits":"0",},
{"lineNum":"   60","line":"    }"},
{"lineNum":"   61","line":""},
{"lineNum":"   62","line":"    // Split the input"},
{"lineNum":"   63","line":"    std::vector<unsigned char> a = std::vector<unsigned char>(input.begin(), input.begin() + this->l_M / 2);","class":"lineNoCov","hits":"0",},
{"lineNum":"   64","line":"    std::vector<unsigned char> b = std::vector<unsigned char>(input.begin() + this->l_M / 2, input.end());","class":"lineNoCov","hits":"0",},
{"lineNum":"   65","line":""},
{"lineNum":"   66","line":"    // Perform the Feistel operations"},
{"lineNum":"   67","line":"    std::vector<unsigned char> x = vec_xor(b, G(0, a));","class":"lineNoCov","hits":"0",},
{"lineNum":"   68","line":"    std::vector<unsigned char> y = vec_xor(a, H(0, x));","class":"lineNoCov","hits":"0",},
{"lineNum":"   69","line":"    std::vector<unsigned char> d = vec_xor(x, G(1, y));","class":"lineNoCov","hits":"0",},
{"lineNum":"   70","line":"    std::vector<unsigned char> c = vec_xor(y, H(1, d));","class":"lineNoCov","hits":"0",},
{"lineNum":"   71","line":""},
{"lineNum":"   72","line":"    // Return the concatenation"},
{"lineNum":"   73","line":"    std::vector<unsigned char> result(c);","class":"lineNoCov","hits":"0",},
{"lineNum":"   74","line":"    result.insert(result.end(), d.begin(), d.end());","class":"lineNoCov","hits":"0",},
{"lineNum":"   75","line":"    return result;","class":"lineNoCov","hits":"0",},
{"lineNum":"   76","line":"}","class":"lineNoCov","hits":"0",},
{"lineNum":"   77","line":""},
{"lineNum":"   78","line":"// Decode the input data"},
{"lineNum":"   79","line":"std::vector<unsigned char> F4Grumble::decode(const std::vector<unsigned char>& input) {","class":"lineNoCov","hits":"0",},
{"lineNum":"   80","line":"    // Check the input size"},
{"lineNum":"   81","line":"    if (input.size() != l_M) {","class":"lineNoCov","hits":"0",},
{"lineNum":"   82","line":"        throw std::invalid_argument(\"Bad address size\");","class":"lineNoCov","hits":"0",},
{"lineNum":"   83","line":"    }"},
{"lineNum":"   84","line":""},
{"lineNum":"   85","line":"    // Split the input"},
{"lineNum":"   86","line":"    std::vector<unsigned char> c = std::vector<unsigned char>(input.begin(), input.begin() + this->l_M / 2);","class":"lineNoCov","hits":"0",},
{"lineNum":"   87","line":"    std::vector<unsigned char> d = std::vector<unsigned char>(input.begin() + this->l_M / 2, input.end());","class":"lineNoCov","hits":"0",},
{"lineNum":"   88","line":""},
{"lineNum":"   89","line":"    // Perform the Feistel operations"},
{"lineNum":"   90","line":"    std::vector<unsigned char> y = vec_xor(c, H(1, d));","class":"lineNoCov","hits":"0",},
{"lineNum":"   91","line":"    std::vector<unsigned char> x = vec_xor(d, G(1, y));","class":"lineNoCov","hits":"0",},
{"lineNum":"   92","line":"    std::vector<unsigned char> a = vec_xor(y, H(0, x));","class":"lineNoCov","hits":"0",},
{"lineNum":"   93","line":"    std::vector<unsigned char> b = vec_xor(x, G(0, a));","class":"lineNoCov","hits":"0",},
{"lineNum":"   94","line":""},
{"lineNum":"   95","line":"    // Return the concatenation"},
{"lineNum":"   96","line":"    std::vector<unsigned char> result(a);","class":"lineNoCov","hits":"0",},
{"lineNum":"   97","line":"    result.insert(result.end(), b.begin(), b.end());","class":"lineNoCov","hits":"0",},
{"lineNum":"   98","line":"    return result;","class":"lineNoCov","hits":"0",},
{"lineNum":"   99","line":"}","class":"lineNoCov","hits":"0",},
{"lineNum":"  100","line":""},
{"lineNum":"  101","line":"// Feistel round functions"},
{"lineNum":"  102","line":"std::vector<unsigned char> F4Grumble::G(const unsigned char i, const std::vector<unsigned char>& u) {","class":"lineNoCov","hits":"0",},
{"lineNum":"  103","line":"\tEVP_MD_CTX* ctx = EVP_MD_CTX_new();","class":"lineNoCov","hits":"0",},
{"lineNum":"  104","line":"    EVP_DigestInit_ex(ctx, EVP_blake2b512(), NULL);","class":"lineNoCov","hits":"0",},
{"lineNum":"  105","line":""},
{"lineNum":"  106","line":"    // Bind the domain separator and network"},
{"lineNum":"  107","line":"    std::vector<unsigned char> domain(LABEL_F4GRUMBLE_G.begin(), LABEL_F4GRUMBLE_G.end());","class":"lineNoCov","hits":"0",},
{"lineNum":"  108","line":"    EVP_DigestUpdate(ctx, domain.data(), domain.size());","class":"lineNoCov","hits":"0",},
{"lineNum":"  109","line":"    EVP_DigestUpdate(ctx, &this->network, sizeof(this->network));","class":"lineNoCov","hits":"0",},
{"lineNum":"  110","line":""},
{"lineNum":"  111","line":"    // Include the round index"},
{"lineNum":"  112","line":"    EVP_DigestUpdate(ctx, &i, sizeof(i));","class":"lineNoCov","hits":"0",},
{"lineNum":"  113","line":""},
{"lineNum":"  114","line":"    // Include the input data"},
{"lineNum":"  115","line":"    EVP_DigestUpdate(ctx, u.data(), u.size());","class":"lineNoCov","hits":"0",},
{"lineNum":"  116","line":""},
{"lineNum":"  117","line":"    // Finalize the hash and resize"},
{"lineNum":"  118","line":"    std::vector<unsigned char> result;","class":"lineNoCov","hits":"0",},
{"lineNum":"  119","line":"    result.resize(EVP_MD_size(EVP_blake2b512()));","class":"lineNoCov","hits":"0",},
{"lineNum":"  120","line":""},
{"lineNum":"  121","line":"    unsigned int TEMP;","class":"lineNoCov","hits":"0",},
{"lineNum":"  122","line":"    EVP_DigestFinal_ex(ctx, result.data(), &TEMP);","class":"lineNoCov","hits":"0",},
{"lineNum":"  123","line":"    EVP_MD_CTX_free(ctx);","class":"lineNoCov","hits":"0",},
{"lineNum":"  124","line":"    result.resize(this->l_R);","class":"lineNoCov","hits":"0",},
{"lineNum":"  125","line":""},
{"lineNum":"  126","line":"    return result;","class":"lineNoCov","hits":"0",},
{"lineNum":"  127","line":"}","class":"lineNoCov","hits":"0",},
{"lineNum":"  128","line":""},
{"lineNum":"  129","line":"std::vector<unsigned char> F4Grumble::H(const unsigned char i, const std::vector<unsigned char>& u) {","class":"lineNoCov","hits":"0",},
{"lineNum":"  130","line":"\tEVP_MD_CTX* ctx = EVP_MD_CTX_new();","class":"lineNoCov","hits":"0",},
{"lineNum":"  131","line":"    EVP_DigestInit_ex(ctx, EVP_blake2b512(), NULL);","class":"lineNoCov","hits":"0",},
{"lineNum":"  132","line":""},
{"lineNum":"  133","line":"    // Bind the domain separator and network"},
{"lineNum":"  134","line":"    std::vector<unsigned char> domain(LABEL_F4GRUMBLE_H.begin(), LABEL_F4GRUMBLE_H.end());","class":"lineNoCov","hits":"0",},
{"lineNum":"  135","line":"    EVP_DigestUpdate(ctx, domain.data(), domain.size());","class":"lineNoCov","hits":"0",},
{"lineNum":"  136","line":"    EVP_DigestUpdate(ctx, &this->network, sizeof(this->network));","class":"lineNoCov","hits":"0",},
{"lineNum":"  137","line":""},
{"lineNum":"  138","line":"    // Include the round index"},
{"lineNum":"  139","line":"    EVP_DigestUpdate(ctx, &i, sizeof(i));","class":"lineNoCov","hits":"0",},
{"lineNum":"  140","line":""},
{"lineNum":"  141","line":"    // Include the input data"},
{"lineNum":"  142","line":"    EVP_DigestUpdate(ctx, u.data(), u.size());","class":"lineNoCov","hits":"0",},
{"lineNum":"  143","line":""},
{"lineNum":"  144","line":"    // Finalize the hash and resize"},
{"lineNum":"  145","line":"    std::vector<unsigned char> result;","class":"lineNoCov","hits":"0",},
{"lineNum":"  146","line":"    result.resize(EVP_MD_size(EVP_blake2b512()));","class":"lineNoCov","hits":"0",},
{"lineNum":"  147","line":""},
{"lineNum":"  148","line":"    unsigned int TEMP;","class":"lineNoCov","hits":"0",},
{"lineNum":"  149","line":"    EVP_DigestFinal_ex(ctx, result.data(), &TEMP);","class":"lineNoCov","hits":"0",},
{"lineNum":"  150","line":"    EVP_MD_CTX_free(ctx);","class":"lineNoCov","hits":"0",},
{"lineNum":"  151","line":"    result.resize(this->l_L);","class":"lineNoCov","hits":"0",},
{"lineNum":"  152","line":""},
{"lineNum":"  153","line":"    return result;","class":"lineNoCov","hits":"0",},
{"lineNum":"  154","line":"}","class":"lineNoCov","hits":"0",},
{"lineNum":"  155","line":""},
{"lineNum":"  156","line":"}"},
]};
var percent_low = 25;var percent_high = 75;
var header = { "command" : "aead_fuzz_debug", "date" : "2023-08-09 11:47:24", "instrumented" : 78, "covered" : 0,};
var merged_data = [];
