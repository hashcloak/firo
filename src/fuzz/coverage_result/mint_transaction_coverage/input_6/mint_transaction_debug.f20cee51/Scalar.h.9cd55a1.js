var data = {lines:[
{"lineNum":"    1","line":"#ifndef SCALAR_H__"},
{"lineNum":"    2","line":"#define SCALAR_H__"},
{"lineNum":"    3","line":""},
{"lineNum":"    4","line":"#include <array>"},
{"lineNum":"    5","line":"#include <functional>"},
{"lineNum":"    6","line":"#include <ostream>"},
{"lineNum":"    7","line":"#include <string>"},
{"lineNum":"    8","line":"#include <vector>"},
{"lineNum":"    9","line":""},
{"lineNum":"   10","line":"#include <inttypes.h>"},
{"lineNum":"   11","line":"#include <stddef.h>"},
{"lineNum":"   12","line":""},
{"lineNum":"   13","line":"namespace secp_primitives {"},
{"lineNum":"   14","line":""},
{"lineNum":"   15","line":"// A wrapper over scalar value of Secp library."},
{"lineNum":"   16","line":"class Scalar final {"},
{"lineNum":"   17","line":"public:"},
{"lineNum":"   18","line":""},
{"lineNum":"   19","line":"    Scalar();"},
{"lineNum":"   20","line":"    // Constructor from integer."},
{"lineNum":"   21","line":"    Scalar(uint64_t value);"},
{"lineNum":"   22","line":""},
{"lineNum":"   23","line":"    // Copy constructor"},
{"lineNum":"   24","line":"    Scalar(const Scalar& other);"},
{"lineNum":"   25","line":""},
{"lineNum":"   26","line":"    Scalar(const unsigned char* str);"},
{"lineNum":"   27","line":""},
{"lineNum":"   28","line":"    ~Scalar();"},
{"lineNum":"   29","line":""},
{"lineNum":"   30","line":"    Scalar& set(const Scalar& other);"},
{"lineNum":"   31","line":""},
{"lineNum":"   32","line":"    Scalar& operator=(const Scalar& other);"},
{"lineNum":"   33","line":""},
{"lineNum":"   34","line":"    Scalar& operator=(unsigned int i);"},
{"lineNum":"   35","line":""},
{"lineNum":"   36","line":"    Scalar& operator=(const unsigned char *bin);"},
{"lineNum":"   37","line":""},
{"lineNum":"   38","line":"    Scalar operator*(const Scalar& other) const;"},
{"lineNum":"   39","line":""},
{"lineNum":"   40","line":"    Scalar& operator*=(const Scalar& other);"},
{"lineNum":"   41","line":""},
{"lineNum":"   42","line":"    Scalar operator+(const Scalar& other) const;"},
{"lineNum":"   43","line":""},
{"lineNum":"   44","line":"    Scalar& operator+=(const Scalar& other);"},
{"lineNum":"   45","line":""},
{"lineNum":"   46","line":"    Scalar operator-(const Scalar& other) const;"},
{"lineNum":"   47","line":""},
{"lineNum":"   48","line":"    Scalar& operator-=(const Scalar& other);"},
{"lineNum":"   49","line":""},
{"lineNum":"   50","line":"    bool operator==(const Scalar& other) const;"},
{"lineNum":"   51","line":"    bool operator!=(const Scalar& other) const;"},
{"lineNum":"   52","line":""},
{"lineNum":"   53","line":"    Scalar inverse() const;"},
{"lineNum":"   54","line":""},
{"lineNum":"   55","line":"    Scalar negate() const;"},
{"lineNum":"   56","line":""},
{"lineNum":"   57","line":"    Scalar square() const;"},
{"lineNum":"   58","line":""},
{"lineNum":"   59","line":"    Scalar exponent(const Scalar& exp) const;"},
{"lineNum":"   60","line":"    Scalar exponent(uint64_t exponent) const;"},
{"lineNum":"   61","line":""},
{"lineNum":"   62","line":"    Scalar& randomize();"},
{"lineNum":"   63","line":""},
{"lineNum":"   64","line":"    Scalar& memberFromSeed(unsigned char* seed);"},
{"lineNum":"   65","line":""},
{"lineNum":"   66","line":"    Scalar& generate(unsigned char* buff);"},
{"lineNum":"   67","line":""},
{"lineNum":"   68","line":"    Scalar& mod_p();"},
{"lineNum":"   69","line":""},
{"lineNum":"   70","line":"    Scalar hash(const unsigned char* data,size_t len);"},
{"lineNum":"   71","line":""},
{"lineNum":"   72","line":"    std::size_t get_hash() const;"},
{"lineNum":"   73","line":""},
{"lineNum":"   74","line":"    bool isMember() const;"},
{"lineNum":"   75","line":""},
{"lineNum":"   76","line":"    bool isZero() const;"},
{"lineNum":"   77","line":""},
{"lineNum":"   78","line":"    // Returns the secp object inside it."},
{"lineNum":"   79","line":"    const void * get_value() const;"},
{"lineNum":"   80","line":""},
{"lineNum":"   81","line":"    friend std::ostream& operator<< ( std::ostream& os, const Scalar& c) {"},
{"lineNum":"   82","line":"        os << c.tostring();"},
{"lineNum":"   83","line":"    return os;"},
{"lineNum":"   84","line":"    }"},
{"lineNum":"   85","line":""},
{"lineNum":"   86","line":"    std::string tostring() const;"},
{"lineNum":"   87","line":""},
{"lineNum":"   88","line":"    static constexpr size_t memoryRequired() { return 32; }"},
{"lineNum":"   89","line":""},
{"lineNum":"   90","line":"    unsigned char* serialize(unsigned char* buffer) const;"},
{"lineNum":"   91","line":"    unsigned const char* deserialize(unsigned const char* buffer);"},
{"lineNum":"   92","line":""},
{"lineNum":"   93","line":"    std::string GetHex() const;"},
{"lineNum":"   94","line":"    void SetHex(const std::string& str);"},
{"lineNum":"   95","line":""},
{"lineNum":"   96","line":"    // These functions are for READWRITE() in serialize.h"},
{"lineNum":"   97","line":""},
{"lineNum":"   98","line":"    template<typename Stream>"},
{"lineNum":"   99","line":"    inline void Serialize(Stream& s) const {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  100","line":"        constexpr int size = memoryRequired();","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  101","line":"        unsigned char buffer[size];"},
{"lineNum":"  102","line":"        serialize(buffer);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  103","line":"        char* b = (char*)buffer;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  104","line":"        s.write(b, size);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  105","line":"    }","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  106","line":""},
{"lineNum":"  107","line":"    template<typename Stream>"},
{"lineNum":"  108","line":"    inline void Unserialize(Stream& s) {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  109","line":"        constexpr int size = memoryRequired();","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  110","line":"        unsigned char buffer[size];"},
{"lineNum":"  111","line":"        char* b = (char*)buffer;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  112","line":"        s.read(b, size);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  113","line":"        deserialize(buffer);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"  114","line":"    }","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"  115","line":""},
{"lineNum":"  116","line":"    void get_bits(std::vector<bool>& bits) const;"},
{"lineNum":"  117","line":""},
{"lineNum":"  118","line":"private:"},
{"lineNum":"  119","line":"    // Constructor from secp object."},
{"lineNum":"  120","line":"    Scalar(const void *value);"},
{"lineNum":"  121","line":""},
{"lineNum":"  122","line":"private:"},
{"lineNum":"  123","line":"    void *value_; // secp256k1_scalar"},
{"lineNum":"  124","line":""},
{"lineNum":"  125","line":"};"},
{"lineNum":"  126","line":""},
{"lineNum":"  127","line":"} // namespace secp_primitives"},
{"lineNum":"  128","line":""},
{"lineNum":"  129","line":"namespace std {"},
{"lineNum":"  130","line":""},
{"lineNum":"  131","line":"using namespace secp_primitives;"},
{"lineNum":"  132","line":""},
{"lineNum":"  133","line":"template<>"},
{"lineNum":"  134","line":"struct hash<Scalar> {"},
{"lineNum":"  135","line":"    size_t operator()(const Scalar& s) const {"},
{"lineNum":"  136","line":"        return s.get_hash();"},
{"lineNum":"  137","line":"    }"},
{"lineNum":"  138","line":"};"},
{"lineNum":"  139","line":""},
{"lineNum":"  140","line":"} // namespace std"},
{"lineNum":"  141","line":""},
{"lineNum":"  142","line":"#endif // SCALAR_H__"},
]};
var percent_low = 25;var percent_high = 75;
var header = { "command" : "mint_transaction_debug", "date" : "2023-08-28 11:27:15", "instrumented" : 12, "covered" : 0,};
var merged_data = [];
