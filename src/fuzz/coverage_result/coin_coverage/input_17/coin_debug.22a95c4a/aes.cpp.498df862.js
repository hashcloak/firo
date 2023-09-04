var data = {lines:[
{"lineNum":"    1","line":"// Copyright (c) 2016 The Bitcoin Core developers"},
{"lineNum":"    2","line":"// Distributed under the MIT software license, see the accompanying"},
{"lineNum":"    3","line":"// file COPYING or http://www.opensource.org/licenses/mit-license.php."},
{"lineNum":"    4","line":""},
{"lineNum":"    5","line":"#include \"aes.h\""},
{"lineNum":"    6","line":"#include \"crypto/common.h\""},
{"lineNum":"    7","line":""},
{"lineNum":"    8","line":"#include <assert.h>"},
{"lineNum":"    9","line":"#include <string.h>"},
{"lineNum":"   10","line":""},
{"lineNum":"   11","line":"extern \"C\" {"},
{"lineNum":"   12","line":"#include \"crypto/ctaes/ctaes.c\""},
{"lineNum":"   13","line":"}"},
{"lineNum":"   14","line":""},
{"lineNum":"   15","line":"AES128Encrypt::AES128Encrypt(const unsigned char key[16])"},
{"lineNum":"   16","line":"{","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   17","line":"    AES128_init(&ctx, key);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   18","line":"}","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   19","line":""},
{"lineNum":"   20","line":"AES128Encrypt::~AES128Encrypt()"},
{"lineNum":"   21","line":"{","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   22","line":"    memset(&ctx, 0, sizeof(ctx));","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   23","line":"}","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   24","line":""},
{"lineNum":"   25","line":"void AES128Encrypt::Encrypt(unsigned char ciphertext[16], const unsigned char plaintext[16]) const"},
{"lineNum":"   26","line":"{","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   27","line":"    AES128_encrypt(&ctx, 1, ciphertext, plaintext);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   28","line":"}","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   29","line":""},
{"lineNum":"   30","line":"AES128Decrypt::AES128Decrypt(const unsigned char key[16])"},
{"lineNum":"   31","line":"{","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   32","line":"    AES128_init(&ctx, key);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   33","line":"}","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   34","line":""},
{"lineNum":"   35","line":"AES128Decrypt::~AES128Decrypt()"},
{"lineNum":"   36","line":"{","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   37","line":"    memset(&ctx, 0, sizeof(ctx));","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   38","line":"}","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   39","line":""},
{"lineNum":"   40","line":"void AES128Decrypt::Decrypt(unsigned char plaintext[16], const unsigned char ciphertext[16]) const"},
{"lineNum":"   41","line":"{","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   42","line":"    AES128_decrypt(&ctx, 1, plaintext, ciphertext);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   43","line":"}","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   44","line":""},
{"lineNum":"   45","line":"AES256Encrypt::AES256Encrypt(const unsigned char key[32])"},
{"lineNum":"   46","line":"{","class":"lineCov","hits":"2","order":"954","possible_hits":"2",},
{"lineNum":"   47","line":"    AES256_init(&ctx, key);","class":"lineCov","hits":"1","order":"955","possible_hits":"1",},
{"lineNum":"   48","line":"}","class":"linePartCov","hits":"1","order":"1118","possible_hits":"2",},
{"lineNum":"   49","line":""},
{"lineNum":"   50","line":"AES256Encrypt::~AES256Encrypt()"},
{"lineNum":"   51","line":"{","class":"lineCov","hits":"2","order":"1217","possible_hits":"2",},
{"lineNum":"   52","line":"    memset(&ctx, 0, sizeof(ctx));","class":"lineCov","hits":"1","order":"1218","possible_hits":"1",},
{"lineNum":"   53","line":"}","class":"linePartCov","hits":"1","order":"1219","possible_hits":"2",},
{"lineNum":"   54","line":""},
{"lineNum":"   55","line":"void AES256Encrypt::Encrypt(unsigned char ciphertext[16], const unsigned char plaintext[16]) const"},
{"lineNum":"   56","line":"{","class":"lineCov","hits":"2","order":"1137","possible_hits":"2",},
{"lineNum":"   57","line":"    AES256_encrypt(&ctx, 1, ciphertext, plaintext);","class":"lineCov","hits":"1","order":"1138","possible_hits":"1",},
{"lineNum":"   58","line":"}","class":"linePartCov","hits":"1","order":"1208","possible_hits":"2",},
{"lineNum":"   59","line":""},
{"lineNum":"   60","line":"AES256Decrypt::AES256Decrypt(const unsigned char key[32])"},
{"lineNum":"   61","line":"{","class":"lineCov","hits":"2","order":"1632","possible_hits":"2",},
{"lineNum":"   62","line":"    AES256_init(&ctx, key);","class":"lineCov","hits":"1","order":"1633","possible_hits":"1",},
{"lineNum":"   63","line":"}","class":"linePartCov","hits":"1","order":"1634","possible_hits":"2",},
{"lineNum":"   64","line":""},
{"lineNum":"   65","line":"AES256Decrypt::~AES256Decrypt()"},
{"lineNum":"   66","line":"{","class":"lineCov","hits":"2","order":"1789","possible_hits":"2",},
{"lineNum":"   67","line":"    memset(&ctx, 0, sizeof(ctx));","class":"lineCov","hits":"1","order":"1790","possible_hits":"1",},
{"lineNum":"   68","line":"}","class":"linePartCov","hits":"1","order":"1791","possible_hits":"2",},
{"lineNum":"   69","line":""},
{"lineNum":"   70","line":"void AES256Decrypt::Decrypt(unsigned char plaintext[16], const unsigned char ciphertext[16]) const"},
{"lineNum":"   71","line":"{","class":"lineCov","hits":"2","order":"1649","possible_hits":"2",},
{"lineNum":"   72","line":"    AES256_decrypt(&ctx, 1, plaintext, ciphertext);","class":"lineCov","hits":"1","order":"1650","possible_hits":"1",},
{"lineNum":"   73","line":"}","class":"linePartCov","hits":"1","order":"1764","possible_hits":"2",},
{"lineNum":"   74","line":""},
{"lineNum":"   75","line":""},
{"lineNum":"   76","line":"template <typename T>"},
{"lineNum":"   77","line":"static int CBCEncrypt(const T& enc, const unsigned char iv[AES_BLOCKSIZE], const unsigned char* data, int size, bool pad, unsigned char* out)"},
{"lineNum":"   78","line":"{","class":"linePartCov","hits":"2","order":"1124","possible_hits":"4",},
{"lineNum":"   79","line":"    int written = 0;","class":"linePartCov","hits":"1","order":"1125","possible_hits":"2",},
{"lineNum":"   80","line":"    int padsize = size % AES_BLOCKSIZE;","class":"linePartCov","hits":"1","order":"1126","possible_hits":"2",},
{"lineNum":"   81","line":"    unsigned char mixed[AES_BLOCKSIZE];"},
{"lineNum":"   82","line":""},
{"lineNum":"   83","line":"    if (!data || !size || !out)","class":"linePartCov","hits":"1","order":"1127","possible_hits":"2",},
{"lineNum":"   84","line":"        return 0;","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   85","line":""},
{"lineNum":"   86","line":"    if (!pad && padsize != 0)","class":"linePartCov","hits":"1","order":"1128","possible_hits":"2",},
{"lineNum":"   87","line":"        return 0;","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   88","line":""},
{"lineNum":"   89","line":"    memcpy(mixed, iv, AES_BLOCKSIZE);","class":"linePartCov","hits":"1","order":"1129","possible_hits":"2",},
{"lineNum":"   90","line":""},
{"lineNum":"   91","line":"    // Write all but the last block"},
{"lineNum":"   92","line":"    while (written + AES_BLOCKSIZE <= size) {","class":"linePartCov","hits":"1","order":"1130","possible_hits":"4",},
{"lineNum":"   93","line":"        for (int i = 0; i != AES_BLOCKSIZE; i++)","class":"lineNoCov","hits":"0","possible_hits":"4",},
{"lineNum":"   94","line":"            mixed[i] ^= *data++;","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   95","line":"        enc.Encrypt(out + written, mixed);","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   96","line":"        memcpy(mixed, out + written, AES_BLOCKSIZE);","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   97","line":"        written += AES_BLOCKSIZE;","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   98","line":"    }"},
{"lineNum":"   99","line":"    if (pad) {","class":"linePartCov","hits":"1","order":"1131","possible_hits":"2",},
{"lineNum":"  100","line":"        // For all that remains, pad each byte with the value of the remaining"},
{"lineNum":"  101","line":"        // space. If there is none, pad by a full block."},
{"lineNum":"  102","line":"        for (int i = 0; i != padsize; i++)","class":"linePartCov","hits":"2","order":"1132","possible_hits":"4",},
{"lineNum":"  103","line":"            mixed[i] ^= *data++;","class":"linePartCov","hits":"1","order":"1133","possible_hits":"2",},
{"lineNum":"  104","line":"        for (int i = padsize; i != AES_BLOCKSIZE; i++)","class":"linePartCov","hits":"2","order":"1134","possible_hits":"4",},
{"lineNum":"  105","line":"            mixed[i] ^= AES_BLOCKSIZE - padsize;","class":"linePartCov","hits":"1","order":"1135","possible_hits":"2",},
{"lineNum":"  106","line":"        enc.Encrypt(out + written, mixed);","class":"linePartCov","hits":"1","order":"1136","possible_hits":"2",},
{"lineNum":"  107","line":"        written += AES_BLOCKSIZE;","class":"linePartCov","hits":"1","order":"1209","possible_hits":"2",},
{"lineNum":"  108","line":"    }"},
{"lineNum":"  109","line":"    return written;","class":"linePartCov","hits":"1","order":"1210","possible_hits":"2",},
{"lineNum":"  110","line":"}","class":"linePartCov","hits":"1","order":"1211","possible_hits":"4",},
{"lineNum":"  111","line":""},
{"lineNum":"  112","line":"template <typename T>"},
{"lineNum":"  113","line":"static int CBCDecrypt(const T& dec, const unsigned char iv[AES_BLOCKSIZE], const unsigned char* data, int size, bool pad, unsigned char* out)"},
{"lineNum":"  114","line":"{","class":"linePartCov","hits":"2","order":"1640","possible_hits":"4",},
{"lineNum":"  115","line":"    unsigned char padsize = 0;","class":"linePartCov","hits":"1","order":"1641","possible_hits":"2",},
{"lineNum":"  116","line":"    int written = 0;","class":"linePartCov","hits":"1","order":"1642","possible_hits":"2",},
{"lineNum":"  117","line":"    bool fail = false;","class":"linePartCov","hits":"1","order":"1643","possible_hits":"2",},
{"lineNum":"  118","line":"    const unsigned char* prev = iv;","class":"linePartCov","hits":"1","order":"1644","possible_hits":"2",},
{"lineNum":"  119","line":""},
{"lineNum":"  120","line":"    if (!data || !size || !out)","class":"linePartCov","hits":"1","order":"1645","possible_hits":"2",},
{"lineNum":"  121","line":"        return 0;","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  122","line":""},
{"lineNum":"  123","line":"    if (size % AES_BLOCKSIZE != 0)","class":"linePartCov","hits":"1","order":"1646","possible_hits":"2",},
{"lineNum":"  124","line":"        return 0;","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  125","line":""},
{"lineNum":"  126","line":"    // Decrypt all data. Padding will be checked in the output."},
{"lineNum":"  127","line":"    while (written != size) {","class":"linePartCov","hits":"2","order":"1647","possible_hits":"4",},
{"lineNum":"  128","line":"        dec.Decrypt(out, data + written);","class":"linePartCov","hits":"1","order":"1648","possible_hits":"2",},
{"lineNum":"  129","line":"        for (int i = 0; i != AES_BLOCKSIZE; i++)","class":"linePartCov","hits":"2","order":"1765","possible_hits":"4",},
{"lineNum":"  130","line":"            *out++ ^= prev[i];","class":"linePartCov","hits":"1","order":"1766","possible_hits":"2",},
{"lineNum":"  131","line":"        prev = data + written;","class":"linePartCov","hits":"1","order":"1767","possible_hits":"2",},
{"lineNum":"  132","line":"        written += AES_BLOCKSIZE;","class":"linePartCov","hits":"1","order":"1768","possible_hits":"2",},
{"lineNum":"  133","line":"    }"},
{"lineNum":"  134","line":""},
{"lineNum":"  135","line":"    // When decrypting padding, attempt to run in constant-time"},
{"lineNum":"  136","line":"    if (pad) {","class":"linePartCov","hits":"1","order":"1769","possible_hits":"2",},
{"lineNum":"  137","line":"        // If used, padding size is the value of the last decrypted byte. For"},
{"lineNum":"  138","line":"        // it to be valid, It must be between 1 and AES_BLOCKSIZE."},
{"lineNum":"  139","line":"        padsize = *--out;","class":"linePartCov","hits":"1","order":"1770","possible_hits":"2",},
{"lineNum":"  140","line":"        fail = !padsize | (padsize > AES_BLOCKSIZE);","class":"linePartCov","hits":"1","order":"1771","possible_hits":"2",},
{"lineNum":"  141","line":""},
{"lineNum":"  142","line":"        // If not well-formed, treat it as though there\'s no padding."},
{"lineNum":"  143","line":"        padsize *= !fail;","class":"linePartCov","hits":"1","order":"1772","possible_hits":"2",},
{"lineNum":"  144","line":""},
{"lineNum":"  145","line":"        // All padding must equal the last byte otherwise it\'s not well-formed"},
{"lineNum":"  146","line":"        for (int i = AES_BLOCKSIZE; i != 0; i--)","class":"linePartCov","hits":"2","order":"1773","possible_hits":"4",},
{"lineNum":"  147","line":"            fail |= ((i > AES_BLOCKSIZE - padsize) & (*out-- != padsize));","class":"linePartCov","hits":"1","order":"1774","possible_hits":"2",},
{"lineNum":"  148","line":""},
{"lineNum":"  149","line":"        written -= padsize;","class":"linePartCov","hits":"1","order":"1775","possible_hits":"2",},
{"lineNum":"  150","line":"    }"},
{"lineNum":"  151","line":"    return written * !fail;","class":"linePartCov","hits":"1","order":"1776","possible_hits":"2",},
{"lineNum":"  152","line":"}","class":"linePartCov","hits":"1","order":"1777","possible_hits":"4",},
{"lineNum":"  153","line":""},
{"lineNum":"  154","line":"AES256CBCEncrypt::AES256CBCEncrypt(const unsigned char key[AES256_KEYSIZE], const unsigned char ivIn[AES_BLOCKSIZE], bool padIn)"},
{"lineNum":"  155","line":"    : enc(key), pad(padIn)","class":"lineCov","hits":"1","order":"953","possible_hits":"1",},
{"lineNum":"  156","line":"{","class":"lineCov","hits":"2","order":"952","possible_hits":"2",},
{"lineNum":"  157","line":"    memcpy(iv, ivIn, AES_BLOCKSIZE);","class":"lineCov","hits":"1","order":"1119","possible_hits":"1",},
{"lineNum":"  158","line":"}","class":"linePartCov","hits":"1","order":"1120","possible_hits":"2",},
{"lineNum":"  159","line":""},
{"lineNum":"  160","line":"int AES256CBCEncrypt::Encrypt(const unsigned char* data, int size, unsigned char* out) const"},
{"lineNum":"  161","line":"{","class":"lineCov","hits":"2","order":"1122","possible_hits":"2",},
{"lineNum":"  162","line":"    return CBCEncrypt(enc, iv, data, size, pad, out);","class":"lineCov","hits":"1","order":"1123","possible_hits":"1",},
{"lineNum":"  163","line":"}"},
{"lineNum":"  164","line":""},
{"lineNum":"  165","line":"AES256CBCEncrypt::~AES256CBCEncrypt()"},
{"lineNum":"  166","line":"{","class":"lineCov","hits":"2","order":"1214","possible_hits":"2",},
{"lineNum":"  167","line":"    memset(iv, 0, sizeof(iv));","class":"lineCov","hits":"1","order":"1215","possible_hits":"1",},
{"lineNum":"  168","line":"}","class":"lineCov","hits":"1","order":"1216","possible_hits":"1",},
{"lineNum":"  169","line":""},
{"lineNum":"  170","line":"AES256CBCDecrypt::AES256CBCDecrypt(const unsigned char key[AES256_KEYSIZE], const unsigned char ivIn[AES_BLOCKSIZE], bool padIn)"},
{"lineNum":"  171","line":"    : dec(key), pad(padIn)","class":"lineCov","hits":"1","order":"1631","possible_hits":"1",},
{"lineNum":"  172","line":"{","class":"lineCov","hits":"2","order":"1630","possible_hits":"2",},
{"lineNum":"  173","line":"    memcpy(iv, ivIn, AES_BLOCKSIZE);","class":"lineCov","hits":"1","order":"1635","possible_hits":"1",},
{"lineNum":"  174","line":"}","class":"linePartCov","hits":"1","order":"1636","possible_hits":"2",},
{"lineNum":"  175","line":""},
{"lineNum":"  176","line":""},
{"lineNum":"  177","line":"int AES256CBCDecrypt::Decrypt(const unsigned char* data, int size, unsigned char* out) const"},
{"lineNum":"  178","line":"{","class":"lineCov","hits":"2","order":"1638","possible_hits":"2",},
{"lineNum":"  179","line":"    return CBCDecrypt(dec, iv, data, size, pad, out);","class":"lineCov","hits":"1","order":"1639","possible_hits":"1",},
{"lineNum":"  180","line":"}"},
{"lineNum":"  181","line":""},
{"lineNum":"  182","line":"AES256CBCDecrypt::~AES256CBCDecrypt()"},
{"lineNum":"  183","line":"{","class":"lineCov","hits":"2","order":"1786","possible_hits":"2",},
{"lineNum":"  184","line":"    memset(iv, 0, sizeof(iv));","class":"lineCov","hits":"1","order":"1787","possible_hits":"1",},
{"lineNum":"  185","line":"}","class":"lineCov","hits":"1","order":"1788","possible_hits":"1",},
{"lineNum":"  186","line":""},
{"lineNum":"  187","line":"AES128CBCEncrypt::AES128CBCEncrypt(const unsigned char key[AES128_KEYSIZE], const unsigned char ivIn[AES_BLOCKSIZE], bool padIn)"},
{"lineNum":"  188","line":"    : enc(key), pad(padIn)","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  189","line":"{","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  190","line":"    memcpy(iv, ivIn, AES_BLOCKSIZE);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  191","line":"}","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  192","line":""},
{"lineNum":"  193","line":"AES128CBCEncrypt::~AES128CBCEncrypt()"},
{"lineNum":"  194","line":"{","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  195","line":"    memset(iv, 0, AES_BLOCKSIZE);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  196","line":"}","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  197","line":""},
{"lineNum":"  198","line":"int AES128CBCEncrypt::Encrypt(const unsigned char* data, int size, unsigned char* out) const"},
{"lineNum":"  199","line":"{","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  200","line":"    return CBCEncrypt(enc, iv, data, size, pad, out);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  201","line":"}"},
{"lineNum":"  202","line":""},
{"lineNum":"  203","line":"AES128CBCDecrypt::AES128CBCDecrypt(const unsigned char key[AES128_KEYSIZE], const unsigned char ivIn[AES_BLOCKSIZE], bool padIn)"},
{"lineNum":"  204","line":"    : dec(key), pad(padIn)","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  205","line":"{","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  206","line":"    memcpy(iv, ivIn, AES_BLOCKSIZE);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  207","line":"}","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  208","line":""},
{"lineNum":"  209","line":"AES128CBCDecrypt::~AES128CBCDecrypt()"},
{"lineNum":"  210","line":"{","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  211","line":"    memset(iv, 0, AES_BLOCKSIZE);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  212","line":"}","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  213","line":""},
{"lineNum":"  214","line":"int AES128CBCDecrypt::Decrypt(const unsigned char* data, int size, unsigned char* out) const"},
{"lineNum":"  215","line":"{","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  216","line":"    return CBCDecrypt(dec, iv, data, size, pad, out);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  217","line":"}"},
]};
var percent_low = 25;var percent_high = 75;
var header = { "command" : "coin_debug", "date" : "2023-08-28 08:53:24", "instrumented" : 119, "covered" : 74,};
var merged_data = [];
