var data = {lines:[
{"lineNum":"    1","line":"#include \"coin.h\""},
{"lineNum":"    2","line":"#include \"../hash.h\""},
{"lineNum":"    3","line":""},
{"lineNum":"    4","line":"namespace spark {"},
{"lineNum":"    5","line":""},
{"lineNum":"    6","line":"using namespace secp_primitives;"},
{"lineNum":"    7","line":""},
{"lineNum":"    8","line":"Coin::Coin() {}","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"    9","line":""},
{"lineNum":"   10","line":"Coin::Coin(const Params* params)","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   11","line":"{","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   12","line":"    this->params = params;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   13","line":"}","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   14","line":""},
{"lineNum":"   15","line":"Coin::Coin(","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   16","line":"\tconst Params* params,"},
{"lineNum":"   17","line":"\tconst char type,"},
{"lineNum":"   18","line":"\tconst Scalar& k,"},
{"lineNum":"   19","line":"\tconst Address& address,"},
{"lineNum":"   20","line":"\tconst uint64_t& v,"},
{"lineNum":"   21","line":"\tconst std::string& memo,"},
{"lineNum":"   22","line":"\tconst std::vector<unsigned char>& serial_context"},
{"lineNum":"   23","line":") {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   24","line":"\tthis->params = params;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   25","line":"\tthis->serial_context = serial_context;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   26","line":""},
{"lineNum":"   27","line":"\t// Validate the type"},
{"lineNum":"   28","line":"\tif (type != COIN_TYPE_MINT && type != COIN_TYPE_SPEND) {","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   29","line":"\t\tthrow std::invalid_argument(\"Bad coin type\");","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   30","line":"\t}"},
{"lineNum":"   31","line":"\tthis->type = type;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   32","line":""},
{"lineNum":"   33","line":""},
{"lineNum":"   34","line":"\t//"},
{"lineNum":"   35","line":"\t// Common elements to both coin types"},
{"lineNum":"   36","line":"\t//"},
{"lineNum":"   37","line":""},
{"lineNum":"   38","line":"\t// Construct the recovery key"},
{"lineNum":"   39","line":"\tthis->K = SparkUtils::hash_div(address.get_d())*SparkUtils::hash_k(k);","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   40","line":""},
{"lineNum":"   41","line":"\t// Construct the serial commitment"},
{"lineNum":"   42","line":"\tthis->S = this->params->get_F()*SparkUtils::hash_ser(k, serial_context) + address.get_Q2();","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   43","line":""},
{"lineNum":"   44","line":"\t// Construct the value commitment"},
{"lineNum":"   45","line":"\tthis->C = this->params->get_G()*Scalar(v) + this->params->get_H()*SparkUtils::hash_val(k);","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   46","line":""},
{"lineNum":"   47","line":"\t// Check the memo validity, and pad if needed"},
{"lineNum":"   48","line":"\tif (memo.size() > this->params->get_memo_bytes()) {","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   49","line":"\t\tthrow std::invalid_argument(\"Memo is too large\");","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   50","line":"\t}"},
{"lineNum":"   51","line":"\tstd::vector<unsigned char> memo_bytes(memo.begin(), memo.end());","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   52","line":"\tstd::vector<unsigned char> padded_memo(memo_bytes);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   53","line":"\tpadded_memo.resize(this->params->get_memo_bytes());","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   54","line":""},
{"lineNum":"   55","line":"\t//"},
{"lineNum":"   56","line":"\t// Type-specific elements"},
{"lineNum":"   57","line":"\t//"},
{"lineNum":"   58","line":""},
{"lineNum":"   59","line":"\tif (this->type == COIN_TYPE_MINT) {","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   60","line":"\t\tthis->v = v;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   61","line":""},
{"lineNum":"   62","line":"\t\t// Encrypt recipient data"},
{"lineNum":"   63","line":"\t\tMintCoinRecipientData r;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   64","line":"\t\tr.d = address.get_d();","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   65","line":"\t\tr.k = k;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   66","line":"\t\tr.memo = std::string(memo.begin(), memo.end());","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   67","line":"\t\tCDataStream r_stream(SER_NETWORK, PROTOCOL_VERSION);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   68","line":"\t\tr_stream << r;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   69","line":"\t\tthis->r_ = AEAD::encrypt(address.get_Q1()*SparkUtils::hash_k(k), \"Mint coin data\", r_stream);","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   70","line":"\t} else {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   71","line":"\t\t// Encrypt recipient data"},
{"lineNum":"   72","line":"\t\tSpendCoinRecipientData r;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   73","line":"\t\tr.v = v;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   74","line":"\t\tr.d = address.get_d();","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   75","line":"\t\tr.k = k;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   76","line":"\t\tr.memo = std::string(memo.begin(), memo.end());","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   77","line":"\t\tCDataStream r_stream(SER_NETWORK, PROTOCOL_VERSION);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   78","line":"\t\tr_stream << r;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   79","line":"\t\tthis->r_ = AEAD::encrypt(address.get_Q1()*SparkUtils::hash_k(k), \"Spend coin data\", r_stream);","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   80","line":"\t}","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   81","line":"}","class":"lineNoCov","hits":"0","possible_hits":"11",},
{"lineNum":"   82","line":""},
{"lineNum":"   83","line":"// Validate a coin for identification"},
{"lineNum":"   84","line":"// NOTE: This assumes the coin has a valid associated range proof, which MUST be separately checked as part of the valid transaction that produced it"},
{"lineNum":"   85","line":"bool Coin::validate("},
{"lineNum":"   86","line":"\tconst IncomingViewKey& incoming_view_key,"},
{"lineNum":"   87","line":"\tIdentifiedCoinData& data"},
{"lineNum":"   88","line":") {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   89","line":"\t// Check recovery key"},
{"lineNum":"   90","line":"\tif (SparkUtils::hash_div(data.d)*SparkUtils::hash_k(data.k) != this->K) {","class":"lineNoCov","hits":"0","possible_hits":"4",},
{"lineNum":"   91","line":"        return false;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   92","line":"\t}"},
{"lineNum":"   93","line":""},
{"lineNum":"   94","line":"\t// Check value commitment"},
{"lineNum":"   95","line":"\tif (this->params->get_G()*Scalar(data.v) + this->params->get_H()*SparkUtils::hash_val(data.k) != this->C) {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   96","line":"        return false;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   97","line":"\t}"},
{"lineNum":"   98","line":""},
{"lineNum":"   99","line":"\t// Check serial commitment"},
{"lineNum":"  100","line":"\tdata.i = incoming_view_key.get_diversifier(data.d);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  101","line":""},
{"lineNum":"  102","line":"\tif (this->params->get_F()*(SparkUtils::hash_ser(data.k, this->serial_context) + SparkUtils::hash_Q2(incoming_view_key.get_s1(), data.i)) + incoming_view_key.get_P2() != this->S) {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  103","line":"        return false;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  104","line":"\t}"},
{"lineNum":"  105","line":""},
{"lineNum":"  106","line":"\treturn true;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  107","line":"}","class":"lineNoCov","hits":"0","possible_hits":"4",},
{"lineNum":"  108","line":""},
{"lineNum":"  109","line":"// Recover a coin"},
{"lineNum":"  110","line":"RecoveredCoinData Coin::recover(const FullViewKey& full_view_key, const IdentifiedCoinData& data) {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  111","line":"\tRecoveredCoinData recovered_data;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  112","line":"\trecovered_data.s = SparkUtils::hash_ser(data.k, this->serial_context) + SparkUtils::hash_Q2(full_view_key.get_s1(), data.i) + full_view_key.get_s2();","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  113","line":"\trecovered_data.T = (this->params->get_U() + full_view_key.get_D().inverse())*recovered_data.s.inverse();","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  114","line":""},
{"lineNum":"  115","line":"\treturn recovered_data;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  116","line":"}","class":"lineNoCov","hits":"0","possible_hits":"3",},
{"lineNum":"  117","line":""},
{"lineNum":"  118","line":"// Identify a coin"},
{"lineNum":"  119","line":"IdentifiedCoinData Coin::identify(const IncomingViewKey& incoming_view_key) {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  120","line":"\tIdentifiedCoinData data;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  121","line":""},
{"lineNum":"  122","line":"\t// Deserialization means this process depends on the coin type"},
{"lineNum":"  123","line":"\tif (this->type == COIN_TYPE_MINT) {","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  124","line":"\t\tMintCoinRecipientData r;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  125","line":""},
{"lineNum":"  126","line":"\t\ttry {"},
{"lineNum":"  127","line":"\t\t\t// Decrypt recipient data"},
{"lineNum":"  128","line":"\t\t\tCDataStream stream = AEAD::decrypt_and_verify(this->K*incoming_view_key.get_s1(), \"Mint coin data\", this->r_);","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  129","line":"\t\t\tstream >> r;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  130","line":"\t\t} catch (...) {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  131","line":"\t\t\tthrow std::runtime_error(\"Unable to identify coin\");","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  132","line":"\t\t}","class":"lineNoCov","hits":"0","possible_hits":"3",},
{"lineNum":"  133","line":""},
{"lineNum":"  134","line":"\t\tdata.d = r.d;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  135","line":"\t\tdata.v = this->v;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  136","line":"\t\tdata.k = r.k;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  137","line":"\t\tdata.memo = r.memo;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  138","line":"\t} else {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  139","line":"\t\tSpendCoinRecipientData r;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  140","line":""},
{"lineNum":"  141","line":"\t\ttry {"},
{"lineNum":"  142","line":"\t\t\t// Decrypt recipient data"},
{"lineNum":"  143","line":"\t\t\tCDataStream stream = AEAD::decrypt_and_verify(this->K*incoming_view_key.get_s1(), \"Spend coin data\", this->r_);","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  144","line":"\t\t\tstream >> r;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  145","line":"\t\t} catch (...) {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  146","line":"\t\t\tthrow std::runtime_error(\"Unable to identify coin\");","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  147","line":"\t\t}","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  148","line":""},
{"lineNum":"  149","line":"\t\tdata.d = r.d;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  150","line":"\t\tdata.v = r.v;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  151","line":"\t\tdata.k = r.k;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  152","line":"\t\tdata.memo = r.memo;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  153","line":"\t}","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  154","line":""},
{"lineNum":"  155","line":"\t// Validate the coin"},
{"lineNum":"  156","line":"\tif (!validate(incoming_view_key, data)) {","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  157","line":"\t\tthrow std::runtime_error(\"Malformed coin\");","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  158","line":"\t}"},
{"lineNum":"  159","line":""},
{"lineNum":"  160","line":"\treturn data;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  161","line":"}","class":"lineNoCov","hits":"0","possible_hits":"12",},
{"lineNum":"  162","line":""},
{"lineNum":"  163","line":"std::size_t Coin::memoryRequired() {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  164","line":"    secp_primitives::GroupElement groupElement;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  165","line":"    return 1 + groupElement.memoryRequired() * 3 + 32 + AEAD_TAG_SIZE;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  166","line":"}","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  167","line":""},
{"lineNum":"  168","line":"bool Coin::operator==(const Coin& other) const {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  169","line":"    return this->S == other.S;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  170","line":"}"},
{"lineNum":"  171","line":""},
{"lineNum":"  172","line":"uint256 Coin::getHash() const {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  173","line":"    CDataStream ss(SER_GETHASH, 0);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  174","line":"    ss << \"coin_hash\";","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  175","line":"    ss << S;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  176","line":"    ss << K;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  177","line":"    ss << C;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  178","line":"    ss << r_;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  179","line":"    return ::Hash(ss.begin(), ss.end());","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  180","line":"}","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  181","line":""},
{"lineNum":"  182","line":"void Coin::setSerialContext(const std::vector<unsigned char>& serial_context_) {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  183","line":"    serial_context = serial_context_;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  184","line":"}","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  185","line":""},
{"lineNum":"  186","line":"}"},
]};
var percent_low = 25;var percent_high = 75;
var header = { "command" : "coin_fuzz_debug", "date" : "2023-08-09 11:41:49", "instrumented" : 103, "covered" : 0,};
var merged_data = [];
