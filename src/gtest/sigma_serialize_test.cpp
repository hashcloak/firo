#include <gtest/gtest.h>
#include <liblelantus/SigmaPlusProver.h>
#include <liblelantus/SigmaPlusVerifier.h>

#include <stdio.h>

TEST(sigma_serialize_tests, group_element_serialize)
{
    secp_primitives::GroupElement initial;
    initial.randomize();
    unsigned char buffer [initial.memoryRequired()];
    initial.serialize(buffer);
    secp_primitives::GroupElement resulted;
    resulted.deserialize(buffer);
    EXPECT_EQ(initial, resulted);
}

TEST(sigma_serialize_tests, group_element_serialize_infinity)
{
    secp_primitives::GroupElement initial;
    unsigned char buffer [initial.memoryRequired()];
    initial.serialize(buffer);
    secp_primitives::GroupElement resulted;
    resulted.deserialize(buffer);
    EXPECT_EQ(initial, resulted);
}

TEST(sigma_serialize_tests, scalar_serialize)
{
    secp_primitives::Scalar initial;
    initial.randomize();
    unsigned char buffer [initial.memoryRequired()];
    initial.serialize(buffer);
    secp_primitives::Scalar resulted;
    resulted.deserialize(buffer);
    EXPECT_EQ(initial, resulted);
}

TEST(sigma_serialize_tests, group_element_readwrite_infrom_file)
{
    secp_primitives::GroupElement initial;
    initial.randomize();
    unsigned char buffer [initial.memoryRequired()];
    initial.serialize(buffer);
    FILE* out = fopen("src/gtest/GroupElement.txt", "w");
    for(int i = 0; i < initial.memoryRequired(); ++i)
        std::putc(buffer[i], out);
    fclose(out);
    secp_primitives::GroupElement resulted;
    unsigned char buffer_result [resulted.memoryRequired()];
    FILE* in = fopen("src/gtest/GroupElement.txt", "r");
    for(int i = 0; i < resulted.memoryRequired(); ++i)
        buffer_result[i] = std::getc(in);
    fclose(in);
    resulted.deserialize(buffer_result);
    EXPECT_EQ(initial, resulted);
}

TEST(sigma_serialize_tests, proof_serialize)
{
    int N = 16;
    int n = 4;
    int index = 0;

    int m = (int)(log(N) / log(n));;

    secp_primitives::GroupElement g;
    g.randomize();
    std::vector<secp_primitives::GroupElement> h_gens;
    h_gens.resize(n * m);
    for(int i = 0; i < n * m; ++i ){
        h_gens[i].randomize();
    }
    secp_primitives::Scalar v, r;
    v.randomize();
    r.randomize();
    lelantus::SigmaPlusProver<secp_primitives::Scalar,secp_primitives::GroupElement> prover(g,h_gens, n, m);

    std::vector<secp_primitives::GroupElement> commits;
    for(int i = 0; i < N; ++i){
        if(i == index){
            secp_primitives::GroupElement c;
            secp_primitives::Scalar zero(uint64_t(0));
            c = lelantus::LelantusPrimitives<secp_primitives::Scalar,secp_primitives::GroupElement>::double_commit(g, zero, h_gens[0], v, h_gens[1], r);
            commits.push_back(c);

        }
        else{
            commits.push_back(secp_primitives::GroupElement());
            commits[i].randomize();
        }
    }

    lelantus::SigmaPlusProof<secp_primitives::Scalar,secp_primitives::GroupElement> initial_proof;

    prover.proof(commits, index, v, r, initial_proof);

    unsigned char buffer [initial_proof.memoryRequired()];
    initial_proof.serialize(buffer);
    lelantus::SigmaPlusProof<secp_primitives::Scalar,secp_primitives::GroupElement> resulted_proof;
    resulted_proof.deserialize(buffer, n, m);

    EXPECT_EQ(initial_proof.B_, resulted_proof.B_);
    EXPECT_EQ(initial_proof.A_, resulted_proof.A_);
    EXPECT_EQ(initial_proof.C_, resulted_proof.C_);
    EXPECT_EQ(initial_proof.D_, resulted_proof.D_);
    EXPECT_EQ(initial_proof.f_, resulted_proof.f_);
    EXPECT_EQ(initial_proof.ZA_, resulted_proof.ZA_);
    EXPECT_EQ(initial_proof.ZC_, resulted_proof.ZC_);
    EXPECT_EQ(initial_proof.Gk_, resulted_proof.Gk_);
    EXPECT_EQ(initial_proof.Qk, resulted_proof.Qk);
    EXPECT_EQ(initial_proof.zV_, resulted_proof.zV_);
    EXPECT_EQ(initial_proof.zR_, resulted_proof.zR_);
}