var data = {lines:[
{"lineNum":"    1","line":"#include \"../../include/Scalar.h\""},
{"lineNum":"    2","line":""},
{"lineNum":"    3","line":"#include \"../../include/secp256k1.h\""},
{"lineNum":"    4","line":""},
{"lineNum":"    5","line":"#if defined HAVE_CONFIG_H"},
{"lineNum":"    6","line":"#include \"../libsecp256k1-config.h\""},
{"lineNum":"    7","line":"#endif"},
{"lineNum":"    8","line":""},
{"lineNum":"    9","line":"#include \"../scalar.h\""},
{"lineNum":"   10","line":"#include \"../scalar_impl.h\""},
{"lineNum":"   11","line":"#include \"../hash_impl.h\""},
{"lineNum":"   12","line":"#include \"../hash.h\""},
{"lineNum":"   13","line":""},
{"lineNum":"   14","line":"#include <array>"},
{"lineNum":"   15","line":"#include <sstream>"},
{"lineNum":"   16","line":"#include <iostream>"},
{"lineNum":"   17","line":"#include <openssl/rand.h>"},
{"lineNum":"   18","line":""},
{"lineNum":"   19","line":"namespace secp_primitives {"},
{"lineNum":"   20","line":""},
{"lineNum":"   21","line":"Scalar::Scalar()"},
{"lineNum":"   22","line":"   : value_(new secp256k1_scalar()) {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   23","line":"    secp256k1_scalar_clear(reinterpret_cast<secp256k1_scalar *>(value_));","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   24","line":"}","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   25","line":""},
{"lineNum":"   26","line":"Scalar::Scalar(uint64_t value)"},
{"lineNum":"   27","line":"   : value_(new secp256k1_scalar()) {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   28","line":"    unsigned char b32[32];"},
{"lineNum":"   29","line":"    for(int i = 0; i < 24; i++)","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   30","line":"        b32[i] = 0;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   31","line":"    b32[24] = value >> 56;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   32","line":"    b32[25] = value >> 48;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   33","line":"    b32[26] = value >> 40;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   34","line":"    b32[27] = value >> 32;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   35","line":"    b32[28] = value >> 24;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   36","line":"    b32[29] = value >> 16;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   37","line":"    b32[30] = value >> 8;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   38","line":"    b32[31] = value;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   39","line":"    secp256k1_scalar_set_b32(reinterpret_cast<secp256k1_scalar *>(value_), b32, 0);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   40","line":"}","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   41","line":""},
{"lineNum":"   42","line":"Scalar::Scalar(const unsigned char* str)"},
{"lineNum":"   43","line":"     : value_(new secp256k1_scalar()) {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   44","line":"    secp256k1_scalar_set_b32(reinterpret_cast<secp256k1_scalar *>(value_), str, 0);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   45","line":"}","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   46","line":""},
{"lineNum":"   47","line":"Scalar::Scalar(const void *value)"},
{"lineNum":"   48","line":"   : value_(new secp256k1_scalar(*reinterpret_cast<const secp256k1_scalar *>(value))) {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   49","line":""},
{"lineNum":"   50","line":"}","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   51","line":""},
{"lineNum":"   52","line":"Scalar::Scalar(const Scalar& other)"},
{"lineNum":"   53","line":"   : value_(new secp256k1_scalar(*reinterpret_cast<const secp256k1_scalar *>(other.value_))) {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   54","line":""},
{"lineNum":"   55","line":"}","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   56","line":""},
{"lineNum":"   57","line":"Scalar::~Scalar() {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   58","line":"    delete reinterpret_cast<secp256k1_scalar *>(value_);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   59","line":"}","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   60","line":""},
{"lineNum":"   61","line":"Scalar& Scalar::operator=(const Scalar& other) {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   62","line":"    return set(other);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   63","line":"}"},
{"lineNum":"   64","line":""},
{"lineNum":"   65","line":"Scalar& Scalar::operator=(unsigned int i) {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   66","line":"    secp256k1_scalar_set_int(reinterpret_cast<secp256k1_scalar *>(value_), i);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   67","line":"    return *this;","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   68","line":"}"},
{"lineNum":"   69","line":""},
{"lineNum":"   70","line":"Scalar& Scalar::operator=(const unsigned char *bin){","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   71","line":"    secp256k1_scalar_set_b32(reinterpret_cast<secp256k1_scalar *>(value_), bin, NULL);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   72","line":"    return *this;","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   73","line":"}"},
{"lineNum":"   74","line":""},
{"lineNum":"   75","line":"Scalar& Scalar::set(const Scalar& other) {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   76","line":"    *reinterpret_cast<secp256k1_scalar *>(value_) = *reinterpret_cast<const secp256k1_scalar *>(other.value_);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   77","line":"    return *this;","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   78","line":"}"},
{"lineNum":"   79","line":""},
{"lineNum":"   80","line":"Scalar Scalar::operator*(const Scalar& other) const {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   81","line":"    secp256k1_scalar result;"},
{"lineNum":"   82","line":"    secp256k1_scalar_mul(&result, reinterpret_cast<const secp256k1_scalar *>(value_), reinterpret_cast<const secp256k1_scalar *>(other.value_));","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   83","line":"    return &result;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   84","line":"}"},
{"lineNum":"   85","line":""},
{"lineNum":"   86","line":"Scalar& Scalar::operator*=(const Scalar& other) {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   87","line":"    secp256k1_scalar result;"},
{"lineNum":"   88","line":""},
{"lineNum":"   89","line":"    secp256k1_scalar_mul(&result, reinterpret_cast<const secp256k1_scalar *>(value_), reinterpret_cast<const secp256k1_scalar *>(other.value_));","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   90","line":"    *reinterpret_cast<secp256k1_scalar *>(value_) = result;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   91","line":""},
{"lineNum":"   92","line":"    return *this;","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   93","line":"}"},
{"lineNum":"   94","line":""},
{"lineNum":"   95","line":"Scalar Scalar::operator+(const Scalar& other) const {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   96","line":"    secp256k1_scalar result;"},
{"lineNum":"   97","line":"    secp256k1_scalar_add(&result, reinterpret_cast<const secp256k1_scalar *>(value_), reinterpret_cast<const secp256k1_scalar *>(other.value_));","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   98","line":"    return &result;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   99","line":"}"},
{"lineNum":"  100","line":""},
{"lineNum":"  101","line":"Scalar& Scalar::operator+=(const Scalar& other) {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  102","line":"    secp256k1_scalar result;"},
{"lineNum":"  103","line":""},
{"lineNum":"  104","line":"    secp256k1_scalar_add(&result, reinterpret_cast<const secp256k1_scalar *>(value_), reinterpret_cast<const secp256k1_scalar *>(other.value_));","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  105","line":"    *reinterpret_cast<secp256k1_scalar *>(value_) = result;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  106","line":""},
{"lineNum":"  107","line":"    return *this;","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  108","line":"}"},
{"lineNum":"  109","line":""},
{"lineNum":"  110","line":"Scalar Scalar::operator-(const Scalar& other) const {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  111","line":"    secp256k1_scalar negated, result;"},
{"lineNum":"  112","line":""},
{"lineNum":"  113","line":"    secp256k1_scalar_negate(&negated, reinterpret_cast<const secp256k1_scalar *>(other.value_));","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  114","line":"    secp256k1_scalar_add(&result, &negated, reinterpret_cast<const secp256k1_scalar *>(value_));","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  115","line":""},
{"lineNum":"  116","line":"    return &result;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  117","line":"}"},
{"lineNum":"  118","line":""},
{"lineNum":"  119","line":"Scalar& Scalar::operator-=(const Scalar& other) {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  120","line":"    secp256k1_scalar negated, result;"},
{"lineNum":"  121","line":""},
{"lineNum":"  122","line":"    secp256k1_scalar_negate(&negated, reinterpret_cast<const secp256k1_scalar *>(other.value_));","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  123","line":"    secp256k1_scalar_add(&result, reinterpret_cast<const secp256k1_scalar *>(value_), &negated);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  124","line":"    *reinterpret_cast<secp256k1_scalar *>(value_) = result;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  125","line":""},
{"lineNum":"  126","line":"    return *this;","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  127","line":"}"},
{"lineNum":"  128","line":""},
{"lineNum":"  129","line":"bool Scalar::operator==(const Scalar& other) const {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  130","line":"    return secp256k1_scalar_eq(reinterpret_cast<const secp256k1_scalar *>(value_), reinterpret_cast<const secp256k1_scalar *>(other.value_));","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  131","line":"}"},
{"lineNum":"  132","line":""},
{"lineNum":"  133","line":"bool Scalar::operator!=(const Scalar& other) const {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  134","line":"    return !(secp256k1_scalar_eq(reinterpret_cast<const secp256k1_scalar *>(value_), reinterpret_cast<const secp256k1_scalar *>(other.value_)));","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  135","line":"}"},
{"lineNum":"  136","line":""},
{"lineNum":"  137","line":"const void * Scalar::get_value() const {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  138","line":"    return value_;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  139","line":"}"},
{"lineNum":"  140","line":""},
{"lineNum":"  141","line":"Scalar Scalar::inverse() const {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  142","line":"    secp256k1_scalar result;"},
{"lineNum":"  143","line":"    secp256k1_scalar_inverse(&result, reinterpret_cast<const secp256k1_scalar *>(value_));","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  144","line":" return &result;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  145","line":"}"},
{"lineNum":"  146","line":""},
{"lineNum":"  147","line":"Scalar Scalar::negate() const {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  148","line":"    secp256k1_scalar result;"},
{"lineNum":"  149","line":"    secp256k1_scalar_negate(&result, reinterpret_cast<const secp256k1_scalar *>(value_));","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  150","line":"    return &result;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  151","line":"}"},
{"lineNum":"  152","line":""},
{"lineNum":"  153","line":"Scalar Scalar::square() const{","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  154","line":"    secp256k1_scalar result;"},
{"lineNum":"  155","line":"    secp256k1_scalar_sqr(&result, reinterpret_cast<const secp256k1_scalar *>(value_));","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  156","line":" return &result;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  157","line":"}"},
{"lineNum":"  158","line":""},
{"lineNum":"  159","line":"Scalar Scalar::exponent(const Scalar& exp) const {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  160","line":"    secp256k1_scalar value(*reinterpret_cast<const secp256k1_scalar *>(value_));","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  161","line":"    secp256k1_scalar exp_(*reinterpret_cast<const secp256k1_scalar *>(exp.value_));","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  162","line":"    secp256k1_scalar result;"},
{"lineNum":"  163","line":""},
{"lineNum":"  164","line":"    secp256k1_scalar_set_int(&result, 1);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  165","line":""},
{"lineNum":"  166","line":"    while (!secp256k1_scalar_is_zero(&exp_)) {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  167","line":"        secp256k1_scalar tmp;"},
{"lineNum":"  168","line":""},
{"lineNum":"  169","line":"        if (!secp256k1_scalar_is_even(&exp_)) {","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  170","line":"            secp256k1_scalar_mul(&tmp, &result, &value);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  171","line":"            result = tmp;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  172","line":"        }"},
{"lineNum":"  173","line":""},
{"lineNum":"  174","line":"        secp256k1_scalar_sqr(&tmp, &value);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  175","line":"        value = tmp;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  176","line":""},
{"lineNum":"  177","line":"        secp256k1_scalar_shr_int(&exp_, 1);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  178","line":"    }"},
{"lineNum":"  179","line":""},
{"lineNum":"  180","line":"    return &result;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  181","line":"}"},
{"lineNum":"  182","line":""},
{"lineNum":"  183","line":"Scalar Scalar::exponent(uint64_t exp) const {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  184","line":"    Scalar exp_(exp);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  185","line":"    return exponent(exp_);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  186","line":""},
{"lineNum":"  187","line":"}","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  188","line":""},
{"lineNum":"  189","line":"bool Scalar::isMember() const {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  190","line":"    Scalar temp(*this);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  191","line":"    temp.mod_p();","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  192","line":"    return *this == temp;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  193","line":"}","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  194","line":""},
{"lineNum":"  195","line":"bool Scalar::isZero() const {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  196","line":"    return secp256k1_scalar_is_zero(reinterpret_cast<const secp256k1_scalar *>(value_));","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  197","line":"}"},
{"lineNum":"  198","line":""},
{"lineNum":"  199","line":"Scalar& Scalar::memberFromSeed(unsigned char* seed) {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  200","line":"    // buffer -> object"},
{"lineNum":"  201","line":"    deserialize(seed);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  202","line":"    do {"},
{"lineNum":"  203","line":"        // object -> buffer"},
{"lineNum":"  204","line":"        serialize(seed);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  205","line":"        // Hash from buffer, stores result in object"},
{"lineNum":"  206","line":"        *this = hash(seed, 32);","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  207","line":"    }while (!(this->isMember()));","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  208","line":""},
{"lineNum":"  209","line":"    return *this;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  210","line":"}","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  211","line":""},
{"lineNum":"  212","line":"Scalar& Scalar::randomize() {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  213","line":"    unsigned char temp[32] = { 0 };","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  214","line":""},
{"lineNum":"  215","line":"    do {"},
{"lineNum":"  216","line":"        if (RAND_bytes(temp, 32) != 1) {","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  217","line":"            throw \"Unable to generate random Scalar\";","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  218","line":"        }"},
{"lineNum":"  219","line":"        generate(temp);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  220","line":"    } while (!this->isMember() || this->isZero()); // we need to ensure, generated value is valid and non 0","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  221","line":""},
{"lineNum":"  222","line":"    return *this;","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  223","line":"}"},
{"lineNum":"  224","line":""},
{"lineNum":"  225","line":"Scalar& Scalar::generate(unsigned char* buff) {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  226","line":"    secp256k1_scalar zero, result;"},
{"lineNum":"  227","line":""},
{"lineNum":"  228","line":"    secp256k1_scalar_set_b32(reinterpret_cast<secp256k1_scalar *>(value_), buff, nullptr);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  229","line":"    secp256k1_scalar_set_int(&zero, 0);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  230","line":""},
{"lineNum":"  231","line":"    secp256k1_scalar_add(&result, reinterpret_cast<const secp256k1_scalar *>(value_), &zero);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  232","line":"    *reinterpret_cast<secp256k1_scalar *>(value_) = result;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  233","line":""},
{"lineNum":"  234","line":"    return *this;","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  235","line":"}"},
{"lineNum":"  236","line":""},
{"lineNum":"  237","line":"Scalar& Scalar::mod_p() {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  238","line":"    secp256k1_scalar zero, result;"},
{"lineNum":"  239","line":""},
{"lineNum":"  240","line":"    secp256k1_scalar_clear(&zero);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  241","line":"    secp256k1_scalar_add(&result, reinterpret_cast<const secp256k1_scalar *>(value_), &zero);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  242","line":"    *reinterpret_cast<secp256k1_scalar *>(value_) = result;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  243","line":""},
{"lineNum":"  244","line":"    return *this;","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  245","line":"}"},
{"lineNum":"  246","line":""},
{"lineNum":"  247","line":"Scalar Scalar::hash(const unsigned char* data, size_t len) {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  248","line":"    unsigned char hash[32];"},
{"lineNum":"  249","line":""},
{"lineNum":"  250","line":"    secp256k1_sha256_t sha256;"},
{"lineNum":"  251","line":"    secp256k1_sha256_initialize(&sha256);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  252","line":"    secp256k1_sha256_write(&sha256, data, len);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  253","line":"    secp256k1_sha256_finalize(&sha256, hash);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  254","line":""},
{"lineNum":"  255","line":"    int overflow = 0;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  256","line":"    secp256k1_scalar result;"},
{"lineNum":"  257","line":"    secp256k1_scalar_set_b32(&result,hash,&overflow);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  258","line":"    if (overflow) {","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  259","line":"     throw \"Scalar: hashing overflowed\";","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  260","line":"    }"},
{"lineNum":"  261","line":"    Scalar result_(&result);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  262","line":"    result_.mod_p();","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  263","line":"    return result_;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  264","line":"}","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  265","line":""},
{"lineNum":"  266","line":"std::size_t Scalar::get_hash() const {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  267","line":"    auto scalar = reinterpret_cast<const secp256k1_scalar *>(value_);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  268","line":"    return scalar->d[0] ^ (scalar->d[1] << 8);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  269","line":"}"},
{"lineNum":"  270","line":""},
{"lineNum":"  271","line":"std::string Scalar::tostring() const {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  272","line":"    unsigned char buffer[32];"},
{"lineNum":"  273","line":"    std::stringstream ss;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  274","line":""},
{"lineNum":"  275","line":"    secp256k1_scalar_get_b32(buffer, reinterpret_cast<const secp256k1_scalar *>(value_));","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  276","line":""},
{"lineNum":"  277","line":"    for (int i = 0; i < 32; ++i) {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  278","line":"        ss << (int)buffer[i];","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  279","line":"    }","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  280","line":""},
{"lineNum":"  281","line":"    return ss.str();","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  282","line":"}","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  283","line":""},
{"lineNum":"  284","line":"unsigned char* Scalar::serialize(unsigned char* buffer) const {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  285","line":"    secp256k1_scalar_get_b32(buffer, reinterpret_cast<const secp256k1_scalar *>(value_));","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  286","line":"    return buffer + 32;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  287","line":"}"},
{"lineNum":"  288","line":""},
{"lineNum":"  289","line":"unsigned const char* Scalar::deserialize(unsigned const char* buffer) {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  290","line":"    int overflow = 0;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  291","line":""},
{"lineNum":"  292","line":"    secp256k1_scalar_set_b32(reinterpret_cast<secp256k1_scalar *>(value_), buffer, &overflow);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  293","line":""},
{"lineNum":"  294","line":"    if (overflow) {","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  295","line":"        throw \"Scalar: decoding overflowed\";","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  296","line":"    }"},
{"lineNum":"  297","line":""},
{"lineNum":"  298","line":"    return buffer + 32;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  299","line":"}"},
{"lineNum":"  300","line":""},
{"lineNum":"  301","line":"std::string Scalar::GetHex() const {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  302","line":"    std::array<unsigned char, 32> buffer;"},
{"lineNum":"  303","line":"    secp256k1_scalar_get_b32(buffer.data(), reinterpret_cast<const secp256k1_scalar *>(value_));","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  304","line":""},
{"lineNum":"  305","line":"    std::stringstream ss;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  306","line":"    ss << std::hex;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  307","line":"    for (const auto b : buffer) {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  308","line":"        ss << (b >> 4);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  309","line":"        ss << (b & 0xF);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  310","line":"    }"},
{"lineNum":"  311","line":""},
{"lineNum":"  312","line":"    return ss.str();","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  313","line":"}","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  314","line":""},
{"lineNum":"  315","line":"void Scalar::SetHex(const std::string& str) {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  316","line":"    if (str.size() != 64) {","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  317","line":"        throw \"Scalar: decoding invalid length\";","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  318","line":"    }"},
{"lineNum":"  319","line":""},
{"lineNum":"  320","line":"    std::array<unsigned char, 32> buffer;"},
{"lineNum":"  321","line":""},
{"lineNum":"  322","line":"    for (std::size_t i = 0; i < buffer.size(); i++) {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  323","line":"        auto hexs = str.substr(2 * i, 2);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  324","line":""},
{"lineNum":"  325","line":"        if (::isxdigit(hexs[0]) && ::isxdigit(hexs[1])) {","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  326","line":"            buffer[i] = strtol(hexs.c_str(), NULL, 16);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  327","line":"        } else {","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  328","line":"            throw \"Scalar: decoding invalid hex\";","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  329","line":"        }"},
{"lineNum":"  330","line":"    }","class":"lineNoCov","hits":"0","possible_hits":"4",},
{"lineNum":"  331","line":""},
{"lineNum":"  332","line":"    int overflow = 0;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  333","line":""},
{"lineNum":"  334","line":"    secp256k1_scalar_set_b32(reinterpret_cast<secp256k1_scalar *>(value_), buffer.data(), &overflow);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  335","line":""},
{"lineNum":"  336","line":"    if (overflow) {","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  337","line":"        throw \"Scalar: decoding overflowed\";","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  338","line":"    }"},
{"lineNum":"  339","line":"}","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  340","line":""},
{"lineNum":"  341","line":"void Scalar::get_bits(std::vector<bool>& bits) const {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  342","line":"    unsigned char bin[32];"},
{"lineNum":"  343","line":""},
{"lineNum":"  344","line":"    secp256k1_scalar_get_b32(bin, reinterpret_cast<const secp256k1_scalar *>(value_));","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  345","line":""},
{"lineNum":"  346","line":"    for (int i = 0; i < 32; ++i) {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  347","line":"        int32_t val = bin[i];","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  348","line":"        for (int j = 7; j >= 0; j--) {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  349","line":"            bits.push_back((val >> j) & 1);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  350","line":"        }"},
{"lineNum":"  351","line":"    }","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  352","line":"}","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  353","line":""},
{"lineNum":"  354","line":"} // namespace secp_primitives"},
]};
var percent_low = 25;var percent_high = 75;
var header = { "command" : "aead_fuzz_debug", "date" : "2023-08-09 11:47:19", "instrumented" : 187, "covered" : 0,};
var merged_data = [];
