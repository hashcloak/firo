var data = {lines:[
{"lineNum":"    1","line":"/**********************************************************************"},
{"lineNum":"    2","line":" * Copyright (c) 2013, 2014 Pieter Wuille                             *"},
{"lineNum":"    3","line":" * Distributed under the MIT software license, see the accompanying   *"},
{"lineNum":"    4","line":" * file COPYING or http://www.opensource.org/licenses/mit-license.php.*"},
{"lineNum":"    5","line":" **********************************************************************/"},
{"lineNum":"    6","line":""},
{"lineNum":"    7","line":"#ifndef _SECP256K1_UTIL_H_"},
{"lineNum":"    8","line":"#define _SECP256K1_UTIL_H_"},
{"lineNum":"    9","line":""},
{"lineNum":"   10","line":"#if defined HAVE_CONFIG_H"},
{"lineNum":"   11","line":"#include \"libsecp256k1-config.h\""},
{"lineNum":"   12","line":"#endif"},
{"lineNum":"   13","line":""},
{"lineNum":"   14","line":"#include <stdlib.h>"},
{"lineNum":"   15","line":"#include <stdint.h>"},
{"lineNum":"   16","line":"#include <stdio.h>"},
{"lineNum":"   17","line":""},
{"lineNum":"   18","line":"typedef struct {"},
{"lineNum":"   19","line":"    void (*fn)(const char *text, void* data);"},
{"lineNum":"   20","line":"    const void* data;"},
{"lineNum":"   21","line":"} secp256k1_callback;"},
{"lineNum":"   22","line":""},
{"lineNum":"   23","line":"static SECP256K1_INLINE void secp256k1_callback_call(const secp256k1_callback * const cb, const char * const text) {","class":"lineNoCov","hits":"0","possible_hits":"4",},
{"lineNum":"   24","line":"    cb->fn(text, (void*)cb->data);","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   25","line":"}","class":"lineNoCov","hits":"0","possible_hits":"4",},
{"lineNum":"   26","line":""},
{"lineNum":"   27","line":"#ifdef DETERMINISTIC"},
{"lineNum":"   28","line":"#define TEST_FAILURE(msg) do { \\"},
{"lineNum":"   29","line":"    fprintf(stderr, \"%s\\n\", msg); \\"},
{"lineNum":"   30","line":"    abort(); \\"},
{"lineNum":"   31","line":"} while(0);"},
{"lineNum":"   32","line":"#else"},
{"lineNum":"   33","line":"#define TEST_FAILURE(msg) do { \\"},
{"lineNum":"   34","line":"    fprintf(stderr, \"%s:%d: %s\\n\", __FILE__, __LINE__, msg); \\"},
{"lineNum":"   35","line":"    abort(); \\"},
{"lineNum":"   36","line":"} while(0)"},
{"lineNum":"   37","line":"#endif"},
{"lineNum":"   38","line":""},
{"lineNum":"   39","line":"#ifdef HAVE_BUILTIN_EXPECT"},
{"lineNum":"   40","line":"#define EXPECT(x,c) __builtin_expect((x),(c))"},
{"lineNum":"   41","line":"#else"},
{"lineNum":"   42","line":"#define EXPECT(x,c) (x)"},
{"lineNum":"   43","line":"#endif"},
{"lineNum":"   44","line":""},
{"lineNum":"   45","line":"#ifdef DETERMINISTIC"},
{"lineNum":"   46","line":"#define CHECK(cond) do { \\"},
{"lineNum":"   47","line":"    if (EXPECT(!(cond), 0)) { \\"},
{"lineNum":"   48","line":"        TEST_FAILURE(\"test condition failed\"); \\"},
{"lineNum":"   49","line":"    } \\"},
{"lineNum":"   50","line":"} while(0)"},
{"lineNum":"   51","line":"#else"},
{"lineNum":"   52","line":"#define CHECK(cond) do { \\"},
{"lineNum":"   53","line":"    if (EXPECT(!(cond), 0)) { \\"},
{"lineNum":"   54","line":"        TEST_FAILURE(\"test condition failed: \" #cond); \\"},
{"lineNum":"   55","line":"    } \\"},
{"lineNum":"   56","line":"} while(0)"},
{"lineNum":"   57","line":"#endif"},
{"lineNum":"   58","line":""},
{"lineNum":"   59","line":"/* Like assert(), but when VERIFY is defined, and side-effect safe. */"},
{"lineNum":"   60","line":"#ifdef VERIFY"},
{"lineNum":"   61","line":"#define VERIFY_CHECK CHECK"},
{"lineNum":"   62","line":"#define VERIFY_SETUP(stmt) do { stmt; } while(0)"},
{"lineNum":"   63","line":"#else"},
{"lineNum":"   64","line":"#define VERIFY_CHECK(cond) do { (void)(cond); } while(0)"},
{"lineNum":"   65","line":"#define VERIFY_SETUP(stmt)"},
{"lineNum":"   66","line":"#endif"},
{"lineNum":"   67","line":""},
{"lineNum":"   68","line":"static SECP256K1_INLINE void *checked_malloc(const secp256k1_callback* cb, size_t size) {","class":"lineNoCov","hits":"0","possible_hits":"4",},
{"lineNum":"   69","line":"    void *ret = malloc(size);","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   70","line":"    if (ret == NULL) {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   71","line":"        secp256k1_callback_call(cb, \"Out of memory\");","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   72","line":"    }"},
{"lineNum":"   73","line":"    return ret;","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   74","line":"}"},
{"lineNum":"   75","line":""},
{"lineNum":"   76","line":"static SECP256K1_INLINE void *checked_realloc(const secp256k1_callback* cb, void *ptr, size_t size) {"},
{"lineNum":"   77","line":"    void *ret = realloc(ptr, size);"},
{"lineNum":"   78","line":"    if (ret == NULL) {"},
{"lineNum":"   79","line":"        secp256k1_callback_call(cb, \"Out of memory\");"},
{"lineNum":"   80","line":"    }"},
{"lineNum":"   81","line":"    return ret;"},
{"lineNum":"   82","line":"}"},
{"lineNum":"   83","line":""},
{"lineNum":"   84","line":"/* Macro for restrict, when available and not in a VERIFY build. */"},
{"lineNum":"   85","line":"#if defined(SECP256K1_BUILD) && defined(VERIFY)"},
{"lineNum":"   86","line":"# define SECP256K1_RESTRICT"},
{"lineNum":"   87","line":"#else"},
{"lineNum":"   88","line":"# if (!defined(__STDC_VERSION__) || (__STDC_VERSION__ < 199901L) )"},
{"lineNum":"   89","line":"#  if SECP256K1_GNUC_PREREQ(3,0)"},
{"lineNum":"   90","line":"#   define SECP256K1_RESTRICT __restrict__"},
{"lineNum":"   91","line":"#  elif (defined(_MSC_VER) && _MSC_VER >= 1400)"},
{"lineNum":"   92","line":"#   define SECP256K1_RESTRICT __restrict"},
{"lineNum":"   93","line":"#  else"},
{"lineNum":"   94","line":"#   define SECP256K1_RESTRICT"},
{"lineNum":"   95","line":"#  endif"},
{"lineNum":"   96","line":"# else"},
{"lineNum":"   97","line":"#  define SECP256K1_RESTRICT restrict"},
{"lineNum":"   98","line":"# endif"},
{"lineNum":"   99","line":"#endif"},
{"lineNum":"  100","line":""},
{"lineNum":"  101","line":"#if defined(_WIN32)"},
{"lineNum":"  102","line":"# define I64FORMAT \"I64d\""},
{"lineNum":"  103","line":"# define I64uFORMAT \"I64u\""},
{"lineNum":"  104","line":"#else"},
{"lineNum":"  105","line":"# define I64FORMAT \"lld\""},
{"lineNum":"  106","line":"# define I64uFORMAT \"llu\""},
{"lineNum":"  107","line":"#endif"},
{"lineNum":"  108","line":""},
{"lineNum":"  109","line":"#if defined(HAVE___INT128)"},
{"lineNum":"  110","line":"# if defined(__GNUC__)"},
{"lineNum":"  111","line":"#  define SECP256K1_GNUC_EXT __extension__"},
{"lineNum":"  112","line":"# else"},
{"lineNum":"  113","line":"#  define SECP256K1_GNUC_EXT"},
{"lineNum":"  114","line":"# endif"},
{"lineNum":"  115","line":"SECP256K1_GNUC_EXT typedef unsigned __int128 uint128_t;"},
{"lineNum":"  116","line":"#endif"},
{"lineNum":"  117","line":""},
{"lineNum":"  118","line":"#endif"},
]};
var percent_low = 25;var percent_high = 75;
var header = { "command" : "coin_debug2", "date" : "2023-08-17 10:56:36", "instrumented" : 8, "covered" : 0,};
var merged_data = [];
