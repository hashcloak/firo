var data = {lines:[
{"lineNum":"    1","line":"#ifndef FIRO_SPARK_AEAD_H"},
{"lineNum":"    2","line":"#define FIRO_SPARK_AEAD_H"},
{"lineNum":"    3","line":"#include <openssl/evp.h>"},
{"lineNum":"    4","line":"#include \"util.h\""},
{"lineNum":"    5","line":""},
{"lineNum":"    6","line":"namespace spark {"},
{"lineNum":"    7","line":""},
{"lineNum":"    8","line":"struct AEADEncryptedData {","class":"lineCov","hits":"1","order":"307",},
{"lineNum":"    9","line":"\tstd::vector<unsigned char> ciphertext;"},
{"lineNum":"   10","line":"\tstd::vector<unsigned char> tag;"},
{"lineNum":"   11","line":"\tstd::vector<unsigned char> key_commitment;"},
{"lineNum":"   12","line":""},
{"lineNum":"   13","line":"\tADD_SERIALIZE_METHODS;","class":"lineNoCov","hits":"0",},
{"lineNum":"   14","line":""},
{"lineNum":"   15","line":"\ttemplate <typename Stream, typename Operation>"},
{"lineNum":"   16","line":"    inline void SerializationOp(Stream& s, Operation ser_action) {","class":"lineNoCov","hits":"0",},
{"lineNum":"   17","line":"        READWRITE(ciphertext);","class":"lineNoCov","hits":"0",},
{"lineNum":"   18","line":"\t\tREADWRITE(tag);","class":"lineNoCov","hits":"0",},
{"lineNum":"   19","line":"\t\tREADWRITE(key_commitment);","class":"lineNoCov","hits":"0",},
{"lineNum":"   20","line":"    }","class":"lineNoCov","hits":"0",},
{"lineNum":"   21","line":"};"},
{"lineNum":"   22","line":""},
{"lineNum":"   23","line":"class AEAD {"},
{"lineNum":"   24","line":"public:"},
{"lineNum":"   25","line":"\tstatic AEADEncryptedData encrypt(const GroupElement& prekey, const std::string additional_data, CDataStream& data);"},
{"lineNum":"   26","line":"\tstatic CDataStream decrypt_and_verify(const GroupElement& prekey, const std::string associated_data, AEADEncryptedData& data);"},
{"lineNum":"   27","line":"};"},
{"lineNum":"   28","line":""},
{"lineNum":"   29","line":"}"},
{"lineNum":"   30","line":""},
{"lineNum":"   31","line":"#endif"},
]};
var percent_low = 25;var percent_high = 75;
var header = { "command" : "", "date" : "2023-08-09 11:47:51", "instrumented" : 7, "covered" : 1,};
var merged_data = [];
