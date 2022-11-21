#include "fuzzing_utilities.h"

FuzzedSecp256k1Object::FuzzedSecp256k1Object(FuzzedDataProvider *fdp) {
    this->fdp = fdp;
}

secp_primitives::GroupElement FuzzedSecp256k1Object::GetGroupElement() {
    char* x = (char *)this->fdp->ConsumeBytes<uint8_t>(256).data();
    char* y = (char *)this->fdp->ConsumeBytes<uint8_t>(256).data();
    secp_primitives::GroupElement ge = secp_primitives::GroupElement(x, y);

    return ge;
}

secp_primitives::Scalar FuzzedSecp256k1Object::GetScalar() {
    uint64_t value = this->fdp->ConsumeIntegral<uint64_t>();
    secp_primitives::Scalar s = secp_primitives::Scalar(value);

    return s;

}

std::vector<secp_primitives::GroupElement> FuzzedSecp256k1Object::GetGroupElements(int len) {
    std::vector<secp_primitives::GroupElement> ge_vec;
    ge_vec.resize(len);
    for (int i = 0; i <= len; i++) {
        ge_vec.push_back(GetGroupElement());
    }

    return ge_vec;
}

std::vector<secp_primitives::Scalar> FuzzedSecp256k1Object::GetScalars(int len) {
    std::vector<secp_primitives::Scalar> scalar_vec;
    scalar_vec.resize(len);
    for (int i = 0; i <= len; i++) {
        scalar_vec.push_back(GetScalar());
    }

    return scalar_vec;
}