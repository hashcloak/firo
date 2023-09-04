var data = {lines:[
{"lineNum":"    1","line":"#include \"aead.h\""},
{"lineNum":"    2","line":""},
{"lineNum":"    3","line":"namespace spark {"},
{"lineNum":"    4","line":""},
{"lineNum":"    5","line":"// Perform authenticated encryption with ChaCha20-Poly1305 using key commitment"},
{"lineNum":"    6","line":"AEADEncryptedData AEAD::encrypt(const GroupElement& prekey, const std::string additional_data, CDataStream& data) {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"    7","line":"\t// Set up the result structure"},
{"lineNum":"    8","line":"\tAEADEncryptedData result;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"    9","line":""},
{"lineNum":"   10","line":"\t// Derive the key and commitment"},
{"lineNum":"   11","line":"\tstd::vector<unsigned char> key = SparkUtils::kdf_aead(prekey);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   12","line":"\tresult.key_commitment = SparkUtils::commit_aead(prekey);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   13","line":""},
{"lineNum":"   14","line":"\t// Internal size tracker; we know the size of the data already, and can ignore"},
{"lineNum":"   15","line":"\tint TEMP;"},
{"lineNum":"   16","line":""},
{"lineNum":"   17","line":"\t// For our application, we can safely use a zero nonce since keys are never reused"},
{"lineNum":"   18","line":"\tstd::vector<unsigned char> iv;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   19","line":"\tiv.resize(AEAD_IV_SIZE);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   20","line":""},
{"lineNum":"   21","line":"\t// Set up the cipher"},
{"lineNum":"   22","line":"\tEVP_CIPHER_CTX* ctx;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   23","line":"\tctx = EVP_CIPHER_CTX_new();","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   24","line":"\tEVP_EncryptInit_ex(ctx, EVP_chacha20_poly1305(), NULL, key.data(), iv.data());","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   25","line":""},
{"lineNum":"   26","line":"\t// Include the associated data"},
{"lineNum":"   27","line":"\tstd::vector<unsigned char> additional_data_bytes(additional_data.begin(), additional_data.end());","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   28","line":"\tEVP_EncryptUpdate(ctx, NULL, &TEMP, additional_data_bytes.data(), additional_data_bytes.size());","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   29","line":""},
{"lineNum":"   30","line":"\t// Encrypt the plaintext"},
{"lineNum":"   31","line":"\tresult.ciphertext.resize(data.size());","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   32","line":"\tEVP_EncryptUpdate(ctx, result.ciphertext.data(), &TEMP, reinterpret_cast<unsigned char *>(data.data()), data.size());","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   33","line":"\tEVP_EncryptFinal_ex(ctx, NULL, &TEMP);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   34","line":""},
{"lineNum":"   35","line":"\t// Get the tag"},
{"lineNum":"   36","line":"\tresult.tag.resize(AEAD_TAG_SIZE);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   37","line":"\tEVP_CIPHER_CTX_ctrl(ctx, EVP_CTRL_AEAD_GET_TAG, AEAD_TAG_SIZE, result.tag.data());","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   38","line":""},
{"lineNum":"   39","line":"\t// Clean up"},
{"lineNum":"   40","line":"\tEVP_CIPHER_CTX_free(ctx);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   41","line":""},
{"lineNum":"   42","line":"\treturn result;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   43","line":"}","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   44","line":""},
{"lineNum":"   45","line":"// Perform authenticated decryption with ChaCha20-Poly1305 using key commitment"},
{"lineNum":"   46","line":"CDataStream AEAD::decrypt_and_verify(const GroupElement& prekey, const std::string additional_data, AEADEncryptedData& data) {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   47","line":"\t// Derive the key and commitment"},
{"lineNum":"   48","line":"\tstd::vector<unsigned char> key = SparkUtils::kdf_aead(prekey);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   49","line":"\tstd::vector<unsigned char> key_commitment = SparkUtils::commit_aead(prekey);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   50","line":""},
{"lineNum":"   51","line":"\t// Assert that the key commitment is valid"},
{"lineNum":"   52","line":"\tif (key_commitment != data.key_commitment) {","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   53","line":"\t\tthrow std::runtime_error(\"Bad AEAD key commitment\");","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   54","line":"\t}"},
{"lineNum":"   55","line":""},
{"lineNum":"   56","line":"\t// Set up the result"},
{"lineNum":"   57","line":"\tCDataStream result(SER_NETWORK, PROTOCOL_VERSION);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   58","line":""},
{"lineNum":"   59","line":"\t// Internal size tracker; we know the size of the data already, and can ignore"},
{"lineNum":"   60","line":"\tint TEMP;"},
{"lineNum":"   61","line":""},
{"lineNum":"   62","line":"\t// For our application, we can safely use a zero nonce since keys are never reused"},
{"lineNum":"   63","line":"\tstd::vector<unsigned char> iv;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   64","line":"\tiv.resize(AEAD_IV_SIZE);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   65","line":""},
{"lineNum":"   66","line":"\t// Set up the cipher"},
{"lineNum":"   67","line":"\tEVP_CIPHER_CTX* ctx;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   68","line":"\tctx = EVP_CIPHER_CTX_new();","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   69","line":"\tEVP_DecryptInit_ex(ctx, EVP_chacha20_poly1305(), NULL, key.data(), iv.data());","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   70","line":""},
{"lineNum":"   71","line":"\t// Include the associated data"},
{"lineNum":"   72","line":"\tstd::vector<unsigned char> additional_data_bytes(additional_data.begin(), additional_data.end());","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   73","line":"\tEVP_DecryptUpdate(ctx, NULL, &TEMP, additional_data_bytes.data(), additional_data_bytes.size());","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   74","line":""},
{"lineNum":"   75","line":"\t// Decrypt the ciphertext"},
{"lineNum":"   76","line":"\tresult.resize(data.ciphertext.size());","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   77","line":"\tEVP_DecryptUpdate(ctx, reinterpret_cast<unsigned char *>(result.data()), &TEMP, data.ciphertext.data(), data.ciphertext.size());","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   78","line":""},
{"lineNum":"   79","line":"\t// Set the expected tag"},
{"lineNum":"   80","line":"\tEVP_CIPHER_CTX_ctrl(ctx, EVP_CTRL_AEAD_SET_TAG, AEAD_TAG_SIZE, data.tag.data());","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   81","line":""},
{"lineNum":"   82","line":"\t// Decrypt and clean up"},
{"lineNum":"   83","line":"\tint ret = EVP_DecryptFinal_ex(ctx, NULL, &TEMP);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   84","line":"\tEVP_CIPHER_CTX_free(ctx);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   85","line":"\tif (ret != 1) {","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   86","line":"\t\tthrow std::runtime_error(\"Bad AEAD authentication\");","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   87","line":"\t}"},
{"lineNum":"   88","line":""},
{"lineNum":"   89","line":"\treturn result;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   90","line":"}","class":"lineNoCov","hits":"0","possible_hits":"4",},
{"lineNum":"   91","line":""},
{"lineNum":"   92","line":"}"},
]};
var percent_low = 25;var percent_high = 75;
var header = { "command" : "mint_transaction_debug", "date" : "2023-08-28 11:42:43", "instrumented" : 41, "covered" : 0,};
var merged_data = [];
