var data = {lines:[
{"lineNum":"    1","line":"/**********************************************************************"},
{"lineNum":"    2","line":" * Copyright (c) 2017 Andrew Poelstra                                 *"},
{"lineNum":"    3","line":" * Distributed under the MIT software license, see the accompanying   *"},
{"lineNum":"    4","line":" * file COPYING or http://www.opensource.org/licenses/mit-license.php.*"},
{"lineNum":"    5","line":" **********************************************************************/"},
{"lineNum":"    6","line":""},
{"lineNum":"    7","line":"#ifndef _SECP256K1_SCRATCH_IMPL_H_"},
{"lineNum":"    8","line":"#define _SECP256K1_SCRATCH_IMPL_H_"},
{"lineNum":"    9","line":""},
{"lineNum":"   10","line":"#include \"scratch.h\""},
{"lineNum":"   11","line":""},
{"lineNum":"   12","line":"/* Using 16 bytes alignment because common architectures never have alignment"},
{"lineNum":"   13","line":" * requirements above 8 for any of the types we care about. In addition we"},
{"lineNum":"   14","line":" * leave some room because currently we don\'t care about a few bytes."},
{"lineNum":"   15","line":" * TODO: Determine this at configure time. */"},
{"lineNum":"   16","line":"#define ALIGNMENT 16"},
{"lineNum":"   17","line":""},
{"lineNum":"   18","line":"static secp256k1_scratch* secp256k1_scratch_create(const secp256k1_callback* error_callback, size_t max_size) {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   19","line":"    secp256k1_scratch* ret = (secp256k1_scratch*)checked_malloc(error_callback, sizeof(*ret));","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   20","line":"    if (ret != NULL) {","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   21","line":"        memset(ret, 0, sizeof(*ret));","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   22","line":"        ret->max_size = max_size;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   23","line":"        ret->error_callback = error_callback;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   24","line":"    }"},
{"lineNum":"   25","line":"    return ret;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   26","line":"}"},
{"lineNum":"   27","line":""},
{"lineNum":"   28","line":"static void secp256k1_scratch_destroy(secp256k1_scratch* scratch) {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   29","line":"    if (scratch != NULL) {","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   30","line":"        VERIFY_CHECK(scratch->frame == 0);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   31","line":"        free(scratch);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   32","line":"    }"},
{"lineNum":"   33","line":"}","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   34","line":""},
{"lineNum":"   35","line":"static size_t secp256k1_scratch_max_allocation(const secp256k1_scratch* scratch, size_t objects) {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   36","line":"    size_t i = 0;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   37","line":"    size_t allocated = 0;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   38","line":"    for (i = 0; i < scratch->frame; i++) {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   39","line":"        allocated += scratch->frame_size[i];","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   40","line":"    }"},
{"lineNum":"   41","line":"    if (scratch->max_size - allocated <= objects * ALIGNMENT) {","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   42","line":"        return 0;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   43","line":"    }"},
{"lineNum":"   44","line":"    return scratch->max_size - allocated - objects * ALIGNMENT;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   45","line":"}","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   46","line":""},
{"lineNum":"   47","line":"static int secp256k1_scratch_allocate_frame(secp256k1_scratch* scratch, size_t n, size_t objects) {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   48","line":"    VERIFY_CHECK(scratch->frame < SECP256K1_SCRATCH_MAX_FRAMES);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   49","line":""},
{"lineNum":"   50","line":"    if (n <= secp256k1_scratch_max_allocation(scratch, objects)) {","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   51","line":"        n += objects * ALIGNMENT;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   52","line":"        scratch->data[scratch->frame] = checked_malloc(scratch->error_callback, n);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   53","line":"        if (scratch->data[scratch->frame] == NULL) {","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   54","line":"            return 0;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   55","line":"        }"},
{"lineNum":"   56","line":"        scratch->frame_size[scratch->frame] = n;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   57","line":"        scratch->offset[scratch->frame] = 0;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   58","line":"        scratch->frame++;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   59","line":"        return 1;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   60","line":"    } else {"},
{"lineNum":"   61","line":"        return 0;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   62","line":"    }"},
{"lineNum":"   63","line":"}","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   64","line":""},
{"lineNum":"   65","line":"static void secp256k1_scratch_deallocate_frame(secp256k1_scratch* scratch) {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   66","line":"    VERIFY_CHECK(scratch->frame > 0);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   67","line":"    scratch->frame -= 1;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   68","line":"    free(scratch->data[scratch->frame]);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   69","line":"}","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   70","line":""},
{"lineNum":"   71","line":"static void *secp256k1_scratch_alloc(secp256k1_scratch* scratch, size_t size) {","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   72","line":"    void *ret;"},
{"lineNum":"   73","line":"    size_t frame = scratch->frame - 1;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   74","line":"    size = ((size + ALIGNMENT - 1) / ALIGNMENT) * ALIGNMENT;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   75","line":""},
{"lineNum":"   76","line":"    if (scratch->frame == 0 || size + scratch->offset[frame] > scratch->frame_size[frame]) {","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   77","line":"        return NULL;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   78","line":"    }"},
{"lineNum":"   79","line":"    ret = (void *) ((unsigned char *) scratch->data[frame] + scratch->offset[frame]);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   80","line":"    memset(ret, 0, size);","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   81","line":"    scratch->offset[frame] += size;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   82","line":""},
{"lineNum":"   83","line":"    return ret;","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   84","line":"}","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   85","line":""},
{"lineNum":"   86","line":"#endif"},
]};
var percent_low = 25;var percent_high = 75;
var header = { "command" : "chaum_fuzz_debug", "date" : "2023-08-09 12:35:10", "instrumented" : 49, "covered" : 0,};
var merged_data = [];
