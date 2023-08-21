var data = {lines:[
{"lineNum":"    1","line":"#include \"transcript.h\""},
{"lineNum":"    2","line":""},
{"lineNum":"    3","line":"namespace spark {"},
{"lineNum":"    4","line":""},
{"lineNum":"    5","line":"using namespace secp_primitives;"},
{"lineNum":"    6","line":""},
{"lineNum":"    7","line":"// Flags for transcript operations"},
{"lineNum":"    8","line":"const unsigned char FLAG_DOMAIN = 0;"},
{"lineNum":"    9","line":"const unsigned char FLAG_DATA = 1;"},
{"lineNum":"   10","line":"const unsigned char FLAG_VECTOR = 2;"},
{"lineNum":"   11","line":"const unsigned char FLAG_CHALLENGE = 3;"},
{"lineNum":"   12","line":""},
{"lineNum":"   13","line":"// Initialize a transcript with a domain separator"},
{"lineNum":"   14","line":"Transcript::Transcript(const std::string domain) {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   15","line":"    // Prepare the state"},
{"lineNum":"   16","line":"    this->ctx = EVP_MD_CTX_new();","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   17","line":"    EVP_DigestInit_ex(this->ctx, EVP_blake2b512(), NULL);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   18","line":""},
{"lineNum":"   19","line":"    // Write the protocol and mode information"},
{"lineNum":"   20","line":"    std::vector<unsigned char> protocol(LABEL_PROTOCOL.begin(), LABEL_PROTOCOL.end());","class":"lineNoCov","hits":"0","possible_hits":"4",},
{"lineNum":"   21","line":"    EVP_DigestUpdate(this->ctx, protocol.data(), protocol.size());","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   22","line":"    EVP_DigestUpdate(this->ctx, &HASH_MODE_TRANSCRIPT, sizeof(HASH_MODE_TRANSCRIPT));","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   23","line":""},
{"lineNum":"   24","line":"    // Domain separator"},
{"lineNum":"   25","line":"    include_flag(FLAG_DOMAIN);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   26","line":"    include_label(domain);","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   27","line":"}","class":"lineNoCov","hits":"0","possible_hits":"3",},
{"lineNum":"   28","line":""},
{"lineNum":"   29","line":"Transcript::~Transcript() {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   30","line":"    EVP_MD_CTX_free(this->ctx);","class":"lineNoCov","hits":"0","possible_hits":"3",},
{"lineNum":"   31","line":"}","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   32","line":""},
{"lineNum":"   33","line":"Transcript& Transcript::operator=(const Transcript& t) {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   34","line":"    if (this == &t) {","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   35","line":"        return *this;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   36","line":"    }"},
{"lineNum":"   37","line":""},
{"lineNum":"   38","line":"    EVP_MD_CTX_copy_ex(this->ctx, t.ctx);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   39","line":""},
{"lineNum":"   40","line":"    return *this;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   41","line":"}","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   42","line":""},
{"lineNum":"   43","line":"// Add a group element"},
{"lineNum":"   44","line":"void Transcript::add(const std::string label, const GroupElement& group_element) {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   45","line":"    std::vector<unsigned char> data;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   46","line":"    data.resize(GroupElement::serialize_size);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   47","line":"    group_element.serialize(data.data());","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   48","line":""},
{"lineNum":"   49","line":"    include_flag(FLAG_DATA);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   50","line":"    include_label(label);","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   51","line":"    include_data(data);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   52","line":"}","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   53","line":""},
{"lineNum":"   54","line":"// Add a vector of group elements"},
{"lineNum":"   55","line":"void Transcript::add(const std::string label, const std::vector<GroupElement>& group_elements) {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   56","line":"    include_flag(FLAG_VECTOR);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   57","line":"    size(group_elements.size());","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   58","line":"    include_label(label);","class":"lineNoCov","hits":"0","possible_hits":"4",},
{"lineNum":"   59","line":"    for (std::size_t i = 0; i < group_elements.size(); i++) {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   60","line":"        std::vector<unsigned char> data;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   61","line":"        data.resize(GroupElement::serialize_size);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   62","line":"        group_elements[i].serialize(data.data());","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   63","line":"        include_data(data);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   64","line":"    }","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   65","line":"}","class":"lineNoCov","hits":"0","possible_hits":"3",},
{"lineNum":"   66","line":""},
{"lineNum":"   67","line":"// Add a scalar"},
{"lineNum":"   68","line":"void Transcript::add(const std::string label, const Scalar& scalar) {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   69","line":"    std::vector<unsigned char> data;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   70","line":"    data.resize(SCALAR_ENCODING);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   71","line":"    scalar.serialize(data.data());","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   72","line":""},
{"lineNum":"   73","line":"    include_flag(FLAG_DATA);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   74","line":"    include_label(label);","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   75","line":"    include_data(data);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   76","line":"}","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   77","line":""},
{"lineNum":"   78","line":"// Add a vector of scalars"},
{"lineNum":"   79","line":"void Transcript::add(const std::string label, const std::vector<Scalar>& scalars) {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   80","line":"    include_flag(FLAG_VECTOR);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   81","line":"    size(scalars.size());","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   82","line":"    include_label(label);","class":"lineNoCov","hits":"0","possible_hits":"4",},
{"lineNum":"   83","line":"    for (std::size_t i = 0; i < scalars.size(); i++) {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   84","line":"        std::vector<unsigned char> data;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   85","line":"        data.resize(SCALAR_ENCODING);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   86","line":"        scalars[i].serialize(data.data());","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   87","line":"        include_data(data);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   88","line":"    }","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   89","line":"}","class":"lineNoCov","hits":"0","possible_hits":"3",},
{"lineNum":"   90","line":""},
{"lineNum":"   91","line":"// Add arbitrary data"},
{"lineNum":"   92","line":"void Transcript::add(const std::string label, const std::vector<unsigned char>& data) {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   93","line":"    include_flag(FLAG_DATA);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   94","line":"    include_label(label);","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   95","line":"    include_data(data);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   96","line":"}","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   97","line":""},
{"lineNum":"   98","line":"// Produce a challenge"},
{"lineNum":"   99","line":"Scalar Transcript::challenge(const std::string label) {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  100","line":"    // Ensure we can properly populate a scalar"},
{"lineNum":"  101","line":"    if (EVP_MD_size(EVP_blake2b512()) < SCALAR_ENCODING) {","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  102","line":"        throw std::runtime_error(\"Bad hash size!\");","class":"lineNoCov","hits":"0","possible_hits":"4",},
{"lineNum":"  103","line":"    }"},
{"lineNum":"  104","line":""},
{"lineNum":"  105","line":"    std::vector<unsigned char> hash;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  106","line":"    hash.resize(EVP_MD_size(EVP_blake2b512()));","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  107","line":"    unsigned char counter = 0;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  108","line":""},
{"lineNum":"  109","line":"    EVP_MD_CTX* state_counter;"},
{"lineNum":"  110","line":"    state_counter = EVP_MD_CTX_new();","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  111","line":"    EVP_DigestInit_ex(state_counter, EVP_blake2b512(), NULL);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  112","line":""},
{"lineNum":"  113","line":"    EVP_MD_CTX* state_finalize;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  114","line":"    state_finalize = EVP_MD_CTX_new();","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  115","line":"    EVP_DigestInit_ex(state_finalize, EVP_blake2b512(), NULL);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  116","line":""},
{"lineNum":"  117","line":"    include_flag(FLAG_CHALLENGE);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  118","line":"    include_label(label);","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  119","line":""},
{"lineNum":"  120","line":"    while (1) {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  121","line":"        // Prepare temporary state for counter testing"},
{"lineNum":"  122","line":"        EVP_MD_CTX_copy_ex(state_counter, this->ctx);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  123","line":""},
{"lineNum":"  124","line":"        // Embed the counter"},
{"lineNum":"  125","line":"        EVP_DigestUpdate(state_counter, &counter, sizeof(counter));","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  126","line":""},
{"lineNum":"  127","line":"        // Finalize the hash with a temporary state"},
{"lineNum":"  128","line":"        EVP_MD_CTX_copy_ex(state_finalize, state_counter);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  129","line":"        unsigned int TEMP; // We already know the digest length!","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  130","line":"        EVP_DigestFinal_ex(state_finalize, hash.data(), &TEMP);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  131","line":""},
{"lineNum":"  132","line":"        // Check for scalar validity"},
{"lineNum":"  133","line":"        Scalar candidate;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  134","line":"        try {"},
{"lineNum":"  135","line":"            candidate.deserialize(hash.data());","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  136","line":"            EVP_MD_CTX_copy_ex(this->ctx, state_counter);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  137","line":""},
{"lineNum":"  138","line":"            EVP_MD_CTX_free(state_counter);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  139","line":"            EVP_MD_CTX_free(state_finalize);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  140","line":""},
{"lineNum":"  141","line":"            return candidate;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  142","line":"        } catch (...) {","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  143","line":"            counter++;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  144","line":"        }","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  145","line":"    }","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  146","line":"}","class":"lineNoCov","hits":"0","possible_hits":"5",},
{"lineNum":"  147","line":""},
{"lineNum":"  148","line":"// Encode and include a size"},
{"lineNum":"  149","line":"void Transcript::size(const std::size_t size_) {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  150","line":"    Scalar size_scalar(size_);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  151","line":"    std::vector<unsigned char> size_data;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  152","line":"    size_data.resize(SCALAR_ENCODING);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  153","line":"    size_scalar.serialize(size_data.data());","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  154","line":"    EVP_DigestUpdate(this->ctx, size_data.data(), size_data.size());","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  155","line":"}","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  156","line":""},
{"lineNum":"  157","line":"// Include a flag"},
{"lineNum":"  158","line":"void Transcript::include_flag(const unsigned char flag) {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  159","line":"    EVP_DigestUpdate(this->ctx, &flag, sizeof(flag));","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  160","line":"}","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  161","line":""},
{"lineNum":"  162","line":"// Encode and include a label"},
{"lineNum":"  163","line":"void Transcript::include_label(const std::string label) {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  164","line":"    std::vector<unsigned char> bytes(label.begin(), label.end());","class":"lineNoCov","hits":"0","possible_hits":"4",},
{"lineNum":"  165","line":"    include_data(bytes);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  166","line":"}","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  167","line":""},
{"lineNum":"  168","line":"// Encode and include data"},
{"lineNum":"  169","line":"void Transcript::include_data(const std::vector<unsigned char>& data) {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  170","line":"    // Include size"},
{"lineNum":"  171","line":"    size(data.size());","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  172","line":""},
{"lineNum":"  173","line":"    // Include data"},
{"lineNum":"  174","line":"    EVP_DigestUpdate(this->ctx, data.data(), data.size());","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  175","line":"}","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  176","line":""},
{"lineNum":"  177","line":"}"},
]};
var percent_low = 25;var percent_high = 75;
var header = { "command" : "chaum_fuzz_debug", "date" : "2023-08-09 12:27:34", "instrumented" : 109, "covered" : 0,};
var merged_data = [];
