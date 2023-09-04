var data = {lines:[
{"lineNum":"    1","line":"#include \"kdf.h\""},
{"lineNum":"    2","line":""},
{"lineNum":"    3","line":"namespace spark {"},
{"lineNum":"    4","line":""},
{"lineNum":"    5","line":"// Set up a labeled KDF"},
{"lineNum":"    6","line":"KDF::KDF(const std::string label, std::size_t derived_key_size) {","class":"lineCov","hits":"2","order":"859","possible_hits":"2",},
{"lineNum":"    7","line":"\tthis->ctx = EVP_MD_CTX_new();","class":"lineCov","hits":"1","order":"860","possible_hits":"1",},
{"lineNum":"    8","line":"\tEVP_DigestInit_ex(this->ctx, EVP_blake2b512(), NULL);","class":"lineCov","hits":"1","order":"861","possible_hits":"1",},
{"lineNum":"    9","line":""},
{"lineNum":"   10","line":"\t// Write the protocol and mode information"},
{"lineNum":"   11","line":"\tstd::vector<unsigned char> protocol(LABEL_PROTOCOL.begin(), LABEL_PROTOCOL.end());","class":"linePartCov","hits":"1","order":"862","possible_hits":"4",},
{"lineNum":"   12","line":"\tEVP_DigestUpdate(this->ctx, protocol.data(), protocol.size());","class":"lineCov","hits":"1","order":"863","possible_hits":"1",},
{"lineNum":"   13","line":"\tEVP_DigestUpdate(this->ctx, &HASH_MODE_KDF, sizeof(HASH_MODE_KDF));","class":"lineCov","hits":"1","order":"864","possible_hits":"1",},
{"lineNum":"   14","line":""},
{"lineNum":"   15","line":"\t// Include the label with size"},
{"lineNum":"   16","line":"\tinclude_size(label.size());","class":"lineCov","hits":"1","order":"865","possible_hits":"1",},
{"lineNum":"   17","line":"\tstd::vector<unsigned char> label_bytes(label.begin(), label.end());","class":"linePartCov","hits":"1","order":"904","possible_hits":"2",},
{"lineNum":"   18","line":"\tEVP_DigestUpdate(this->ctx, label_bytes.data(), label_bytes.size());","class":"lineCov","hits":"1","order":"905","possible_hits":"1",},
{"lineNum":"   19","line":""},
{"lineNum":"   20","line":"\t// Embed and set the derived key size"},
{"lineNum":"   21","line":"\tif (derived_key_size > EVP_MD_size(EVP_blake2b512())) {","class":"lineCov","hits":"1","order":"906","possible_hits":"1",},
{"lineNum":"   22","line":"\t\tthrow std::invalid_argument(\"Requested KDF size is too large\");","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   23","line":"\t}"},
{"lineNum":"   24","line":"\tinclude_size(derived_key_size);","class":"lineCov","hits":"1","order":"907","possible_hits":"1",},
{"lineNum":"   25","line":"\tthis->derived_key_size = derived_key_size;","class":"lineCov","hits":"1","order":"908","possible_hits":"1",},
{"lineNum":"   26","line":"}","class":"linePartCov","hits":"1","order":"909","possible_hits":"4",},
{"lineNum":"   27","line":""},
{"lineNum":"   28","line":"// Clean up"},
{"lineNum":"   29","line":"KDF::~KDF() {","class":"lineCov","hits":"2","order":"936","possible_hits":"2",},
{"lineNum":"   30","line":"\tEVP_MD_CTX_free(this->ctx);","class":"linePartCov","hits":"1","order":"937","possible_hits":"3",},
{"lineNum":"   31","line":"}","class":"lineCov","hits":"1","order":"938","possible_hits":"1",},
{"lineNum":"   32","line":""},
{"lineNum":"   33","line":"// Include serialized data in the KDF"},
{"lineNum":"   34","line":"void KDF::include(CDataStream& data) {","class":"lineCov","hits":"2","order":"922","possible_hits":"2",},
{"lineNum":"   35","line":"\tinclude_size(data.size());","class":"lineCov","hits":"1","order":"923","possible_hits":"1",},
{"lineNum":"   36","line":"\tEVP_DigestUpdate(this->ctx, reinterpret_cast<unsigned char *>(data.data()), data.size());","class":"lineCov","hits":"1","order":"924","possible_hits":"1",},
{"lineNum":"   37","line":"}","class":"linePartCov","hits":"1","order":"925","possible_hits":"2",},
{"lineNum":"   38","line":""},
{"lineNum":"   39","line":"// Finalize the KDF with arbitrary size"},
{"lineNum":"   40","line":"std::vector<unsigned char> KDF::finalize() {","class":"lineCov","hits":"2","order":"927","possible_hits":"2",},
{"lineNum":"   41","line":"\tstd::vector<unsigned char> result;","class":"lineCov","hits":"1","order":"928","possible_hits":"1",},
{"lineNum":"   42","line":"\tresult.resize(EVP_MD_size(EVP_blake2b512()));","class":"lineCov","hits":"1","order":"929","possible_hits":"1",},
{"lineNum":"   43","line":""},
{"lineNum":"   44","line":"\tunsigned int TEMP;","class":"lineCov","hits":"1","order":"930","possible_hits":"1",},
{"lineNum":"   45","line":"\tEVP_DigestFinal_ex(this->ctx, result.data(), &TEMP);","class":"lineCov","hits":"1","order":"931","possible_hits":"1",},
{"lineNum":"   46","line":"\tresult.resize(this->derived_key_size);","class":"lineCov","hits":"1","order":"932","possible_hits":"1",},
{"lineNum":"   47","line":""},
{"lineNum":"   48","line":"\treturn result;","class":"lineCov","hits":"1","order":"933","possible_hits":"1",},
{"lineNum":"   49","line":"}","class":"lineCov","hits":"1","order":"934","possible_hits":"1",},
{"lineNum":"   50","line":""},
{"lineNum":"   51","line":"// Include a serialized size in the KDF"},
{"lineNum":"   52","line":"void KDF::include_size(std::size_t size) {","class":"lineCov","hits":"2","order":"866","possible_hits":"2",},
{"lineNum":"   53","line":"\tCDataStream stream(SER_NETWORK, PROTOCOL_VERSION);","class":"lineCov","hits":"1","order":"867","possible_hits":"1",},
{"lineNum":"   54","line":"\tstream << size;","class":"lineCov","hits":"1","order":"878","possible_hits":"1",},
{"lineNum":"   55","line":"\tEVP_DigestUpdate(this->ctx, reinterpret_cast<unsigned char *>(stream.data()), stream.size());","class":"lineCov","hits":"1","order":"890","possible_hits":"1",},
{"lineNum":"   56","line":"}","class":"lineCov","hits":"1","order":"893","possible_hits":"1",},
{"lineNum":"   57","line":""},
{"lineNum":"   58","line":"}"},
]};
var percent_low = 25;var percent_high = 75;
var header = { "command" : "coin_debug", "date" : "2023-08-28 08:52:32", "instrumented" : 34, "covered" : 33,};
var merged_data = [];
