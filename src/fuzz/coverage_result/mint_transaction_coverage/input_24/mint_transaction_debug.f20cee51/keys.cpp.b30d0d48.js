var data = {lines:[
{"lineNum":"    1","line":"#include \"keys.h\""},
{"lineNum":"    2","line":"#include \"../hash.h\""},
{"lineNum":"    3","line":""},
{"lineNum":"    4","line":"namespace spark {"},
{"lineNum":"    5","line":""},
{"lineNum":"    6","line":"using namespace secp_primitives;"},
{"lineNum":"    7","line":""},
{"lineNum":"    8","line":"SpendKey::SpendKey(const Params* params) {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"    9","line":"\tthis->params = params;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   10","line":"\tthis->s1.randomize();","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   11","line":"\tthis->s2.randomize();","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   12","line":"\tthis->r.randomize();","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   13","line":"}","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   14","line":""},
{"lineNum":"   15","line":"SpendKey::SpendKey(const Params* params, const Scalar& r_) {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   16","line":"    this->params = params;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   17","line":"    this->r = r_;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   18","line":"    std::vector<unsigned char> data;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   19","line":"    data.resize(32);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   20","line":"    r.serialize(data.data());","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   21","line":"    std::vector<unsigned char> result(CSHA256().OUTPUT_SIZE);","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   22","line":""},
{"lineNum":"   23","line":"    CHash256 hash256;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   24","line":"    std::string prefix1 = \"s1_generation\";","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   25","line":"    hash256.Write(reinterpret_cast<const unsigned char*>(prefix1.c_str()), prefix1.size());","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   26","line":"    hash256.Write(data.data(), data.size());","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   27","line":"    hash256.Finalize(&result[0]);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   28","line":"    this->s1.memberFromSeed(&result[0]);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   29","line":""},
{"lineNum":"   30","line":"    data.clear();","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   31","line":"    result.clear();","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   32","line":"    hash256.Reset();","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   33","line":"    s1.serialize(data.data());","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   34","line":""},
{"lineNum":"   35","line":"    std::string prefix2 = \"s2_generation\";","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   36","line":"    hash256.Write(reinterpret_cast<const unsigned char*>(prefix2.c_str()), prefix2.size());","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   37","line":"    hash256.Write(data.data(), data.size());","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   38","line":"    hash256.Finalize(&result[0]);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   39","line":"    this->s2.memberFromSeed(&result[0]);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   40","line":"}","class":"lineNoCov","hits":"0","possible_hits":"4",},
{"lineNum":"   41","line":""},
{"lineNum":"   42","line":"const Params* SpendKey::get_params() const {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   43","line":"\treturn this->params;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   44","line":"}"},
{"lineNum":"   45","line":""},
{"lineNum":"   46","line":"const Scalar& SpendKey::get_s1() const {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   47","line":"\treturn this->s1;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   48","line":"}"},
{"lineNum":"   49","line":""},
{"lineNum":"   50","line":"const Scalar& SpendKey::get_s2() const {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   51","line":"\treturn this->s2;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   52","line":"}"},
{"lineNum":"   53","line":""},
{"lineNum":"   54","line":"const Scalar& SpendKey::get_r() const {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   55","line":"\treturn this->r;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   56","line":"}"},
{"lineNum":"   57","line":""},
{"lineNum":"   58","line":"SpendKey& SpendKey::operator=(const SpendKey& other) {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   59","line":"    this->s1 = other.s1;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   60","line":"    this->s2 = other.s2;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   61","line":"    this->r = other.r;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   62","line":"    return *this;","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   63","line":"}"},
{"lineNum":"   64","line":""},
{"lineNum":"   65","line":"bool SpendKey::operator==(const SpendKey& other) const {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   66","line":"    if (this->s1 != other.s1 ||","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   67","line":"    this->s2 != other.s2 ||","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   68","line":"    this->r != other.r)","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   69","line":"        return false;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   70","line":"    return true;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   71","line":"}","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   72","line":""},
{"lineNum":"   73","line":"FullViewKey::FullViewKey() {}","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   74","line":"FullViewKey::FullViewKey(const Params* params) {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   75","line":"    this->params = params;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   76","line":"}","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   77","line":"FullViewKey::FullViewKey(const SpendKey& spend_key) {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   78","line":"\tthis->params = spend_key.get_params();","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   79","line":"\tthis->s1 = spend_key.get_s1();","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   80","line":"\tthis->s2 = spend_key.get_s2();","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   81","line":"\tthis->D = this->params->get_G()*spend_key.get_r();","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   82","line":"\tthis->P2 = this->params->get_F()*this->s2 + this->D;","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   83","line":"}","class":"lineNoCov","hits":"0","possible_hits":"3",},
{"lineNum":"   84","line":""},
{"lineNum":"   85","line":"const Params* FullViewKey::get_params() const {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   86","line":"\treturn this->params;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   87","line":"}"},
{"lineNum":"   88","line":""},
{"lineNum":"   89","line":"const Scalar& FullViewKey::get_s1() const {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   90","line":"\treturn this->s1;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   91","line":"}"},
{"lineNum":"   92","line":""},
{"lineNum":"   93","line":"const Scalar& FullViewKey::get_s2() const {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   94","line":"\treturn this->s2;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   95","line":"}"},
{"lineNum":"   96","line":""},
{"lineNum":"   97","line":"const GroupElement& FullViewKey::get_D() const {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   98","line":"\treturn this->D;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   99","line":"}"},
{"lineNum":"  100","line":""},
{"lineNum":"  101","line":"const GroupElement& FullViewKey::get_P2() const {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  102","line":"\treturn this->P2;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  103","line":"}"},
{"lineNum":"  104","line":""},
{"lineNum":"  105","line":"IncomingViewKey::IncomingViewKey() {}","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  106","line":""},
{"lineNum":"  107","line":"IncomingViewKey::IncomingViewKey(const Params* params) {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  108","line":"    this->params = params;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  109","line":"}","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  110","line":""},
{"lineNum":"  111","line":"IncomingViewKey::IncomingViewKey(const FullViewKey& full_view_key) {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  112","line":"\tthis->params = full_view_key.get_params();","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  113","line":"\tthis->s1 = full_view_key.get_s1();","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  114","line":"\tthis->P2 = full_view_key.get_P2();","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  115","line":"}","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  116","line":""},
{"lineNum":"  117","line":"const Params* IncomingViewKey::get_params() const {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  118","line":"\treturn this->params;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  119","line":"}"},
{"lineNum":"  120","line":""},
{"lineNum":"  121","line":"const Scalar& IncomingViewKey::get_s1() const {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  122","line":"\treturn this->s1;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  123","line":"}"},
{"lineNum":"  124","line":""},
{"lineNum":"  125","line":"const GroupElement& IncomingViewKey::get_P2() const {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  126","line":"\treturn this->P2;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  127","line":"}"},
{"lineNum":"  128","line":""},
{"lineNum":"  129","line":"uint64_t IncomingViewKey::get_diversifier(const std::vector<unsigned char>& d) const {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  130","line":"\t// Assert proper size"},
{"lineNum":"  131","line":"\tif (d.size() != AES_BLOCKSIZE) {","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  132","line":"\t\tthrow std::invalid_argument(\"Bad encrypted diversifier\");","class":"lineNoCov","hits":"0","possible_hits":"4",},
{"lineNum":"  133","line":"\t}"},
{"lineNum":"  134","line":""},
{"lineNum":"  135","line":"\t// Decrypt the diversifier; this is NOT AUTHENTICATED and MUST be externally checked for validity against a claimed address"},
{"lineNum":"  136","line":"\tstd::vector<unsigned char> key = SparkUtils::kdf_diversifier(this->s1);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  137","line":"\tuint64_t i = SparkUtils::diversifier_decrypt(key, d);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  138","line":""},
{"lineNum":"  139","line":"\treturn i;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  140","line":"}","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  141","line":""},
{"lineNum":"  142","line":"Address::Address() {}","class":"lineNoCov","hits":"0","possible_hits":"3",},
{"lineNum":"  143","line":""},
{"lineNum":"  144","line":"Address::Address(const Params* params) {","class":"lineNoCov","hits":"0","possible_hits":"3",},
{"lineNum":"  145","line":"    this->params = params;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  146","line":"}","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  147","line":""},
{"lineNum":"  148","line":"Address::Address(const IncomingViewKey& incoming_view_key, const uint64_t i) {","class":"lineNoCov","hits":"0","possible_hits":"3",},
{"lineNum":"  149","line":"\t// Encrypt the diversifier"},
{"lineNum":"  150","line":"\tstd::vector<unsigned char> key = SparkUtils::kdf_diversifier(incoming_view_key.get_s1());","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  151","line":"\tthis->params = incoming_view_key.get_params();","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  152","line":"\tthis->d = SparkUtils::diversifier_encrypt(key, i);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  153","line":"\tthis->Q1 = SparkUtils::hash_div(this->d)*incoming_view_key.get_s1();","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  154","line":"\tthis->Q2 = this->params->get_F()*SparkUtils::hash_Q2(incoming_view_key.get_s1(), i) + incoming_view_key.get_P2();","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  155","line":"}","class":"lineNoCov","hits":"0","possible_hits":"3",},
{"lineNum":"  156","line":""},
{"lineNum":"  157","line":"const Params* Address::get_params() const {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  158","line":"\treturn this->params;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  159","line":"}"},
{"lineNum":"  160","line":""},
{"lineNum":"  161","line":"const std::vector<unsigned char>& Address::get_d() const {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  162","line":"\treturn this->d;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  163","line":"}"},
{"lineNum":"  164","line":""},
{"lineNum":"  165","line":"const GroupElement& Address::get_Q1() const {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  166","line":"\treturn this->Q1;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  167","line":"}"},
{"lineNum":"  168","line":""},
{"lineNum":"  169","line":"const GroupElement& Address::get_Q2() const {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  170","line":"\treturn this->Q2;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  171","line":"}"},
{"lineNum":"  172","line":""},
{"lineNum":"  173","line":"std::string Address::GetHex() const {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  174","line":"    const std::size_t size = 2* GroupElement::serialize_size + AES_BLOCKSIZE;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  175","line":"    std::vector<unsigned char> buffer;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  176","line":"    buffer.reserve(size);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  177","line":"    buffer.resize(2* GroupElement::serialize_size);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  178","line":"    unsigned char* ptr = buffer.data();","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  179","line":"    ptr = Q1.serialize(ptr);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  180","line":"    Q2.serialize(ptr);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  181","line":"    buffer.insert(buffer.end(), d.begin(), d.end());","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  182","line":""},
{"lineNum":"  183","line":"    std::stringstream ss;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  184","line":"    ss << std::hex;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  185","line":"    ss << version;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  186","line":""},
{"lineNum":"  187","line":"    for (const auto b : buffer) {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  188","line":"        ss << (b >> 4);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  189","line":"        ss << (b & 0xF);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  190","line":"    }"},
{"lineNum":"  191","line":""},
{"lineNum":"  192","line":"    std::string str = ss.str();","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  193","line":"    uint160 checksum = Hash160(str.begin(), str.end());","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  194","line":"    ss << checksum.GetHex();","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  195","line":"    return ss.str();","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  196","line":"}","class":"lineNoCov","hits":"0","possible_hits":"3",},
{"lineNum":"  197","line":""},
{"lineNum":"  198","line":"void Address::SetHex(const std::string& str) {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  199","line":"    const std::size_t size = 2 * GroupElement::serialize_size + AES_BLOCKSIZE;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  200","line":"    if (str.size() != ((size + 20) * 2 + 1)) {","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  201","line":"        throw \"Address: SetHex failed, invalid length\";","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  202","line":"    }"},
{"lineNum":"  203","line":""},
{"lineNum":"  204","line":"    version = *str.c_str();","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  205","line":"    std::array<unsigned char, size> buffer;"},
{"lineNum":"  206","line":"    for (std::size_t i = 0; i < buffer.size(); i++) {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  207","line":"        auto hexs = str.substr(2 * i + 1, 2);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  208","line":""},
{"lineNum":"  209","line":"        if (::isxdigit(hexs[0]) && ::isxdigit(hexs[1])) {","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  210","line":"            buffer[i] = strtol(hexs.c_str(), NULL, 16);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  211","line":"        } else {","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  212","line":"            throw \"Address: SetHex failed, invalid hex\";","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  213","line":"        }"},
{"lineNum":"  214","line":"    }","class":"lineNoCov","hits":"0","possible_hits":"4",},
{"lineNum":"  215","line":""},
{"lineNum":"  216","line":"    const unsigned char *ptr = Q1.deserialize(buffer.data());","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  217","line":"    Q2.deserialize(ptr);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  218","line":"    d.insert(d.end(), buffer.begin() + 2 * GroupElement::serialize_size, buffer.end());","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  219","line":""},
{"lineNum":"  220","line":"    // check for checksum validity"},
{"lineNum":"  221","line":"    std::string checksum = str.substr(size * 2 + 1, str.size() - 1);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  222","line":"    // get checksum from newly deserialized address to compare with checksum form input"},
{"lineNum":"  223","line":"    std::string resultChecksum = GetHex().substr(size * 2 + 1, str.size() - 1);","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  224","line":"    if (checksum != resultChecksum)","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  225","line":"        throw \"Address: SetHex failed, invalid checksum\";","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  226","line":"}","class":"lineNoCov","hits":"0","possible_hits":"3",},
{"lineNum":"  227","line":""},
{"lineNum":"  228","line":"// Encode the address to string, given a network identifier"},
{"lineNum":"  229","line":"std::string Address::encode(const unsigned char network) const {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  230","line":"\t// Serialize the address components"},
{"lineNum":"  231","line":"\tstd::vector<unsigned char> raw;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  232","line":"\traw.reserve(2 * GroupElement::serialize_size + AES_BLOCKSIZE);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  233","line":""},
{"lineNum":"  234","line":"\traw.insert(raw.end(), this->d.begin(), this->d.end());","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  235","line":""},
{"lineNum":"  236","line":"\tstd::vector<unsigned char> component;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  237","line":"\tcomponent.resize(GroupElement::serialize_size);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  238","line":""},
{"lineNum":"  239","line":"\tthis->get_Q1().serialize(component.data());","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  240","line":"\traw.insert(raw.end(), component.begin(), component.end());","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  241","line":""},
{"lineNum":"  242","line":"\tthis->get_Q2().serialize(component.data());","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  243","line":"\traw.insert(raw.end(), component.begin(), component.end());","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  244","line":""},
{"lineNum":"  245","line":"\t// Apply the scramble encoding and prepend the network byte"},
{"lineNum":"  246","line":"\tstd::vector<unsigned char> scrambled = F4Grumble(network, raw.size()).encode(raw);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  247","line":""},
{"lineNum":"  248","line":"\t// Encode using `bech32m`"},
{"lineNum":"  249","line":"\tstd::string hrp;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  250","line":"\thrp.push_back(ADDRESS_ENCODING_PREFIX);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  251","line":"\thrp.push_back(network);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  252","line":""},
{"lineNum":"  253","line":"\tstd::vector<uint8_t> bit_converted;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  254","line":"\tbech32::convertbits(bit_converted, scrambled, 8, 5, true);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  255","line":""},
{"lineNum":"  256","line":"\treturn bech32::encode(hrp, bit_converted, bech32::Encoding::BECH32M);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  257","line":"}","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  258","line":""},
{"lineNum":"  259","line":"// Decode an address (if possible) from a string, returning the network identifier"},
{"lineNum":"  260","line":"unsigned char Address::decode(const std::string& str) {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  261","line":"\t// Decode using `bech32m`"},
{"lineNum":"  262","line":"\tbech32::DecodeResult decoded = bech32::decode(str);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  263","line":""},
{"lineNum":"  264","line":"\t// Check the encoding"},
{"lineNum":"  265","line":"\tif (decoded.encoding != bech32::Encoding::BECH32M) {","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  266","line":"\t\tthrow std::invalid_argument(\"Bad address encoding\");","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  267","line":"\t}"},
{"lineNum":"  268","line":""},
{"lineNum":"  269","line":"\t// Check the encoding prefix"},
{"lineNum":"  270","line":"\tif (decoded.hrp[0] != ADDRESS_ENCODING_PREFIX) {","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  271","line":"\t\tthrow std::invalid_argument(\"Bad address prefix\");","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  272","line":"\t}"},
{"lineNum":"  273","line":""},
{"lineNum":"  274","line":"\t// Get the network identifier"},
{"lineNum":"  275","line":"\tunsigned char network = decoded.hrp[1];","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  276","line":""},
{"lineNum":"  277","line":"\t// Convert the address components to bytes"},
{"lineNum":"  278","line":"\tstd::vector<uint8_t> scrambled;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  279","line":"\tbech32::convertbits(scrambled, decoded.data, 5, 8, false);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  280","line":""},
{"lineNum":"  281","line":"\t// Assert the proper address size"},
{"lineNum":"  282","line":"\tif (scrambled.size() != 2 * GroupElement::serialize_size + AES_BLOCKSIZE) {","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  283","line":"\t\tthrow std::invalid_argument(\"Bad address size\");","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  284","line":"\t}"},
{"lineNum":"  285","line":""},
{"lineNum":"  286","line":"\t// Apply the scramble decoding"},
{"lineNum":"  287","line":"\tstd::vector<unsigned char> raw = F4Grumble(network, scrambled.size()).decode(scrambled);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  288","line":""},
{"lineNum":"  289","line":"\t// Deserialize the adddress components"},
{"lineNum":"  290","line":"\tthis->d = std::vector<unsigned char>(raw.begin(), raw.begin() + AES_BLOCKSIZE);","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  291","line":""},
{"lineNum":"  292","line":"\tstd::vector<unsigned char> component(raw.begin() + AES_BLOCKSIZE, raw.begin() + AES_BLOCKSIZE + GroupElement::serialize_size);","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  293","line":"\tthis->Q1.deserialize(component.data());","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  294","line":""},
{"lineNum":"  295","line":"\tcomponent = std::vector<unsigned char>(raw.begin() + AES_BLOCKSIZE + GroupElement::serialize_size, raw.end());","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  296","line":"\tthis->Q2.deserialize(component.data());","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  297","line":""},
{"lineNum":"  298","line":"\treturn network;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  299","line":"}","class":"lineNoCov","hits":"0","possible_hits":"8",},
{"lineNum":"  300","line":""},
{"lineNum":"  301","line":"}"},
]};
var percent_low = 25;var percent_high = 75;
var header = { "command" : "mint_transaction_debug", "date" : "2023-08-28 11:36:34", "instrumented" : 188, "covered" : 0,};
var merged_data = [];
