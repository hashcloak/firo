var data = {lines:[
{"lineNum":"    1","line":"/**********************************************************************"},
{"lineNum":"    2","line":" * Copyright (c) 2013-2014 Diederik Huys, Pieter Wuille               *"},
{"lineNum":"    3","line":" * Distributed under the MIT software license, see the accompanying   *"},
{"lineNum":"    4","line":" * file COPYING or http://www.opensource.org/licenses/mit-license.php.*"},
{"lineNum":"    5","line":" **********************************************************************/"},
{"lineNum":"    6","line":""},
{"lineNum":"    7","line":"/**"},
{"lineNum":"    8","line":" * Changelog:"},
{"lineNum":"    9","line":" * - March 2013, Diederik Huys:    original version"},
{"lineNum":"   10","line":" * - November 2014, Pieter Wuille: updated to use Peter Dettman\'s parallel multiplication algorithm"},
{"lineNum":"   11","line":" * - December 2014, Pieter Wuille: converted from YASM to GCC inline assembly"},
{"lineNum":"   12","line":" */"},
{"lineNum":"   13","line":""},
{"lineNum":"   14","line":"#ifndef _SECP256K1_FIELD_INNER5X52_IMPL_H_"},
{"lineNum":"   15","line":"#define _SECP256K1_FIELD_INNER5X52_IMPL_H_"},
{"lineNum":"   16","line":""},
{"lineNum":"   17","line":"SECP256K1_INLINE static void secp256k1_fe_mul_inner(uint64_t *r, const uint64_t *a, const uint64_t * SECP256K1_RESTRICT b) {","class":"lineCov","hits":"4","order":"319","possible_hits":"4",},
{"lineNum":"   18","line":"/**"},
{"lineNum":"   19","line":" * Registers: rdx:rax = multiplication accumulator"},
{"lineNum":"   20","line":" *            r9:r8   = c"},
{"lineNum":"   21","line":" *            r15:rcx = d"},
{"lineNum":"   22","line":" *            r10-r14 = a0-a4"},
{"lineNum":"   23","line":" *            rbx     = b"},
{"lineNum":"   24","line":" *            rdi     = r"},
{"lineNum":"   25","line":" *            rsi     = a / t?"},
{"lineNum":"   26","line":" */"},
{"lineNum":"   27","line":"  uint64_t tmp1, tmp2, tmp3;"},
{"lineNum":"   28","line":"__asm__ __volatile__(","class":"lineCov","hits":"4","order":"320","possible_hits":"4",},
{"lineNum":"   29","line":"    \"movq 0(%%rsi),%%r10\\n\""},
{"lineNum":"   30","line":"    \"movq 8(%%rsi),%%r11\\n\""},
{"lineNum":"   31","line":"    \"movq 16(%%rsi),%%r12\\n\""},
{"lineNum":"   32","line":"    \"movq 24(%%rsi),%%r13\\n\""},
{"lineNum":"   33","line":"    \"movq 32(%%rsi),%%r14\\n\""},
{"lineNum":"   34","line":""},
{"lineNum":"   35","line":"    /* d += a3 * b0 */"},
{"lineNum":"   36","line":"    \"movq 0(%%rbx),%%rax\\n\""},
{"lineNum":"   37","line":"    \"mulq %%r13\\n\""},
{"lineNum":"   38","line":"    \"movq %%rax,%%rcx\\n\""},
{"lineNum":"   39","line":"    \"movq %%rdx,%%r15\\n\""},
{"lineNum":"   40","line":"    /* d += a2 * b1 */"},
{"lineNum":"   41","line":"    \"movq 8(%%rbx),%%rax\\n\""},
{"lineNum":"   42","line":"    \"mulq %%r12\\n\""},
{"lineNum":"   43","line":"    \"addq %%rax,%%rcx\\n\""},
{"lineNum":"   44","line":"    \"adcq %%rdx,%%r15\\n\""},
{"lineNum":"   45","line":"    /* d += a1 * b2 */"},
{"lineNum":"   46","line":"    \"movq 16(%%rbx),%%rax\\n\""},
{"lineNum":"   47","line":"    \"mulq %%r11\\n\""},
{"lineNum":"   48","line":"    \"addq %%rax,%%rcx\\n\""},
{"lineNum":"   49","line":"    \"adcq %%rdx,%%r15\\n\""},
{"lineNum":"   50","line":"    /* d = a0 * b3 */"},
{"lineNum":"   51","line":"    \"movq 24(%%rbx),%%rax\\n\""},
{"lineNum":"   52","line":"    \"mulq %%r10\\n\""},
{"lineNum":"   53","line":"    \"addq %%rax,%%rcx\\n\""},
{"lineNum":"   54","line":"    \"adcq %%rdx,%%r15\\n\""},
{"lineNum":"   55","line":"    /* c = a4 * b4 */"},
{"lineNum":"   56","line":"    \"movq 32(%%rbx),%%rax\\n\""},
{"lineNum":"   57","line":"    \"mulq %%r14\\n\""},
{"lineNum":"   58","line":"    \"movq %%rax,%%r8\\n\""},
{"lineNum":"   59","line":"    \"movq %%rdx,%%r9\\n\""},
{"lineNum":"   60","line":"    /* d += (c & M) * R */"},
{"lineNum":"   61","line":"    \"movq $0xfffffffffffff,%%rdx\\n\""},
{"lineNum":"   62","line":"    \"andq %%rdx,%%rax\\n\""},
{"lineNum":"   63","line":"    \"movq $0x1000003d10,%%rdx\\n\""},
{"lineNum":"   64","line":"    \"mulq %%rdx\\n\""},
{"lineNum":"   65","line":"    \"addq %%rax,%%rcx\\n\""},
{"lineNum":"   66","line":"    \"adcq %%rdx,%%r15\\n\""},
{"lineNum":"   67","line":"    /* c >>= 52 (%%r8 only) */"},
{"lineNum":"   68","line":"    \"shrdq $52,%%r9,%%r8\\n\""},
{"lineNum":"   69","line":"    /* t3 (tmp1) = d & M */"},
{"lineNum":"   70","line":"    \"movq %%rcx,%%rsi\\n\""},
{"lineNum":"   71","line":"    \"movq $0xfffffffffffff,%%rdx\\n\""},
{"lineNum":"   72","line":"    \"andq %%rdx,%%rsi\\n\""},
{"lineNum":"   73","line":"    \"movq %%rsi,%q1\\n\""},
{"lineNum":"   74","line":"    /* d >>= 52 */"},
{"lineNum":"   75","line":"    \"shrdq $52,%%r15,%%rcx\\n\""},
{"lineNum":"   76","line":"    \"xorq %%r15,%%r15\\n\""},
{"lineNum":"   77","line":"    /* d += a4 * b0 */"},
{"lineNum":"   78","line":"    \"movq 0(%%rbx),%%rax\\n\""},
{"lineNum":"   79","line":"    \"mulq %%r14\\n\""},
{"lineNum":"   80","line":"    \"addq %%rax,%%rcx\\n\""},
{"lineNum":"   81","line":"    \"adcq %%rdx,%%r15\\n\""},
{"lineNum":"   82","line":"    /* d += a3 * b1 */"},
{"lineNum":"   83","line":"    \"movq 8(%%rbx),%%rax\\n\""},
{"lineNum":"   84","line":"    \"mulq %%r13\\n\""},
{"lineNum":"   85","line":"    \"addq %%rax,%%rcx\\n\""},
{"lineNum":"   86","line":"    \"adcq %%rdx,%%r15\\n\""},
{"lineNum":"   87","line":"    /* d += a2 * b2 */"},
{"lineNum":"   88","line":"    \"movq 16(%%rbx),%%rax\\n\""},
{"lineNum":"   89","line":"    \"mulq %%r12\\n\""},
{"lineNum":"   90","line":"    \"addq %%rax,%%rcx\\n\""},
{"lineNum":"   91","line":"    \"adcq %%rdx,%%r15\\n\""},
{"lineNum":"   92","line":"    /* d += a1 * b3 */"},
{"lineNum":"   93","line":"    \"movq 24(%%rbx),%%rax\\n\""},
{"lineNum":"   94","line":"    \"mulq %%r11\\n\""},
{"lineNum":"   95","line":"    \"addq %%rax,%%rcx\\n\""},
{"lineNum":"   96","line":"    \"adcq %%rdx,%%r15\\n\""},
{"lineNum":"   97","line":"    /* d += a0 * b4 */"},
{"lineNum":"   98","line":"    \"movq 32(%%rbx),%%rax\\n\""},
{"lineNum":"   99","line":"    \"mulq %%r10\\n\""},
{"lineNum":"  100","line":"    \"addq %%rax,%%rcx\\n\""},
{"lineNum":"  101","line":"    \"adcq %%rdx,%%r15\\n\""},
{"lineNum":"  102","line":"    /* d += c * R */"},
{"lineNum":"  103","line":"    \"movq %%r8,%%rax\\n\""},
{"lineNum":"  104","line":"    \"movq $0x1000003d10,%%rdx\\n\""},
{"lineNum":"  105","line":"    \"mulq %%rdx\\n\""},
{"lineNum":"  106","line":"    \"addq %%rax,%%rcx\\n\""},
{"lineNum":"  107","line":"    \"adcq %%rdx,%%r15\\n\""},
{"lineNum":"  108","line":"    /* t4 = d & M (%%rsi) */"},
{"lineNum":"  109","line":"    \"movq %%rcx,%%rsi\\n\""},
{"lineNum":"  110","line":"    \"movq $0xfffffffffffff,%%rdx\\n\""},
{"lineNum":"  111","line":"    \"andq %%rdx,%%rsi\\n\""},
{"lineNum":"  112","line":"    /* d >>= 52 */"},
{"lineNum":"  113","line":"    \"shrdq $52,%%r15,%%rcx\\n\""},
{"lineNum":"  114","line":"    \"xorq %%r15,%%r15\\n\""},
{"lineNum":"  115","line":"    /* tx = t4 >> 48 (tmp3) */"},
{"lineNum":"  116","line":"    \"movq %%rsi,%%rax\\n\""},
{"lineNum":"  117","line":"    \"shrq $48,%%rax\\n\""},
{"lineNum":"  118","line":"    \"movq %%rax,%q3\\n\""},
{"lineNum":"  119","line":"    /* t4 &= (M >> 4) (tmp2) */"},
{"lineNum":"  120","line":"    \"movq $0xffffffffffff,%%rax\\n\""},
{"lineNum":"  121","line":"    \"andq %%rax,%%rsi\\n\""},
{"lineNum":"  122","line":"    \"movq %%rsi,%q2\\n\""},
{"lineNum":"  123","line":"    /* c = a0 * b0 */"},
{"lineNum":"  124","line":"    \"movq 0(%%rbx),%%rax\\n\""},
{"lineNum":"  125","line":"    \"mulq %%r10\\n\""},
{"lineNum":"  126","line":"    \"movq %%rax,%%r8\\n\""},
{"lineNum":"  127","line":"    \"movq %%rdx,%%r9\\n\""},
{"lineNum":"  128","line":"    /* d += a4 * b1 */"},
{"lineNum":"  129","line":"    \"movq 8(%%rbx),%%rax\\n\""},
{"lineNum":"  130","line":"    \"mulq %%r14\\n\""},
{"lineNum":"  131","line":"    \"addq %%rax,%%rcx\\n\""},
{"lineNum":"  132","line":"    \"adcq %%rdx,%%r15\\n\""},
{"lineNum":"  133","line":"    /* d += a3 * b2 */"},
{"lineNum":"  134","line":"    \"movq 16(%%rbx),%%rax\\n\""},
{"lineNum":"  135","line":"    \"mulq %%r13\\n\""},
{"lineNum":"  136","line":"    \"addq %%rax,%%rcx\\n\""},
{"lineNum":"  137","line":"    \"adcq %%rdx,%%r15\\n\""},
{"lineNum":"  138","line":"    /* d += a2 * b3 */"},
{"lineNum":"  139","line":"    \"movq 24(%%rbx),%%rax\\n\""},
{"lineNum":"  140","line":"    \"mulq %%r12\\n\""},
{"lineNum":"  141","line":"    \"addq %%rax,%%rcx\\n\""},
{"lineNum":"  142","line":"    \"adcq %%rdx,%%r15\\n\""},
{"lineNum":"  143","line":"    /* d += a1 * b4 */"},
{"lineNum":"  144","line":"    \"movq 32(%%rbx),%%rax\\n\""},
{"lineNum":"  145","line":"    \"mulq %%r11\\n\""},
{"lineNum":"  146","line":"    \"addq %%rax,%%rcx\\n\""},
{"lineNum":"  147","line":"    \"adcq %%rdx,%%r15\\n\""},
{"lineNum":"  148","line":"    /* u0 = d & M (%%rsi) */"},
{"lineNum":"  149","line":"    \"movq %%rcx,%%rsi\\n\""},
{"lineNum":"  150","line":"    \"movq $0xfffffffffffff,%%rdx\\n\""},
{"lineNum":"  151","line":"    \"andq %%rdx,%%rsi\\n\""},
{"lineNum":"  152","line":"    /* d >>= 52 */"},
{"lineNum":"  153","line":"    \"shrdq $52,%%r15,%%rcx\\n\""},
{"lineNum":"  154","line":"    \"xorq %%r15,%%r15\\n\""},
{"lineNum":"  155","line":"    /* u0 = (u0 << 4) | tx (%%rsi) */"},
{"lineNum":"  156","line":"    \"shlq $4,%%rsi\\n\""},
{"lineNum":"  157","line":"    \"movq %q3,%%rax\\n\""},
{"lineNum":"  158","line":"    \"orq %%rax,%%rsi\\n\""},
{"lineNum":"  159","line":"    /* c += u0 * (R >> 4) */"},
{"lineNum":"  160","line":"    \"movq $0x1000003d1,%%rax\\n\""},
{"lineNum":"  161","line":"    \"mulq %%rsi\\n\""},
{"lineNum":"  162","line":"    \"addq %%rax,%%r8\\n\""},
{"lineNum":"  163","line":"    \"adcq %%rdx,%%r9\\n\""},
{"lineNum":"  164","line":"    /* r[0] = c & M */"},
{"lineNum":"  165","line":"    \"movq %%r8,%%rax\\n\""},
{"lineNum":"  166","line":"    \"movq $0xfffffffffffff,%%rdx\\n\""},
{"lineNum":"  167","line":"    \"andq %%rdx,%%rax\\n\""},
{"lineNum":"  168","line":"    \"movq %%rax,0(%%rdi)\\n\""},
{"lineNum":"  169","line":"    /* c >>= 52 */"},
{"lineNum":"  170","line":"    \"shrdq $52,%%r9,%%r8\\n\""},
{"lineNum":"  171","line":"    \"xorq %%r9,%%r9\\n\""},
{"lineNum":"  172","line":"    /* c += a1 * b0 */"},
{"lineNum":"  173","line":"    \"movq 0(%%rbx),%%rax\\n\""},
{"lineNum":"  174","line":"    \"mulq %%r11\\n\""},
{"lineNum":"  175","line":"    \"addq %%rax,%%r8\\n\""},
{"lineNum":"  176","line":"    \"adcq %%rdx,%%r9\\n\""},
{"lineNum":"  177","line":"    /* c += a0 * b1 */"},
{"lineNum":"  178","line":"    \"movq 8(%%rbx),%%rax\\n\""},
{"lineNum":"  179","line":"    \"mulq %%r10\\n\""},
{"lineNum":"  180","line":"    \"addq %%rax,%%r8\\n\""},
{"lineNum":"  181","line":"    \"adcq %%rdx,%%r9\\n\""},
{"lineNum":"  182","line":"    /* d += a4 * b2 */"},
{"lineNum":"  183","line":"    \"movq 16(%%rbx),%%rax\\n\""},
{"lineNum":"  184","line":"    \"mulq %%r14\\n\""},
{"lineNum":"  185","line":"    \"addq %%rax,%%rcx\\n\""},
{"lineNum":"  186","line":"    \"adcq %%rdx,%%r15\\n\""},
{"lineNum":"  187","line":"    /* d += a3 * b3 */"},
{"lineNum":"  188","line":"    \"movq 24(%%rbx),%%rax\\n\""},
{"lineNum":"  189","line":"    \"mulq %%r13\\n\""},
{"lineNum":"  190","line":"    \"addq %%rax,%%rcx\\n\""},
{"lineNum":"  191","line":"    \"adcq %%rdx,%%r15\\n\""},
{"lineNum":"  192","line":"    /* d += a2 * b4 */"},
{"lineNum":"  193","line":"    \"movq 32(%%rbx),%%rax\\n\""},
{"lineNum":"  194","line":"    \"mulq %%r12\\n\""},
{"lineNum":"  195","line":"    \"addq %%rax,%%rcx\\n\""},
{"lineNum":"  196","line":"    \"adcq %%rdx,%%r15\\n\""},
{"lineNum":"  197","line":"    /* c += (d & M) * R */"},
{"lineNum":"  198","line":"    \"movq %%rcx,%%rax\\n\""},
{"lineNum":"  199","line":"    \"movq $0xfffffffffffff,%%rdx\\n\""},
{"lineNum":"  200","line":"    \"andq %%rdx,%%rax\\n\""},
{"lineNum":"  201","line":"    \"movq $0x1000003d10,%%rdx\\n\""},
{"lineNum":"  202","line":"    \"mulq %%rdx\\n\""},
{"lineNum":"  203","line":"    \"addq %%rax,%%r8\\n\""},
{"lineNum":"  204","line":"    \"adcq %%rdx,%%r9\\n\""},
{"lineNum":"  205","line":"    /* d >>= 52 */"},
{"lineNum":"  206","line":"    \"shrdq $52,%%r15,%%rcx\\n\""},
{"lineNum":"  207","line":"    \"xorq %%r15,%%r15\\n\""},
{"lineNum":"  208","line":"    /* r[1] = c & M */"},
{"lineNum":"  209","line":"    \"movq %%r8,%%rax\\n\""},
{"lineNum":"  210","line":"    \"movq $0xfffffffffffff,%%rdx\\n\""},
{"lineNum":"  211","line":"    \"andq %%rdx,%%rax\\n\""},
{"lineNum":"  212","line":"    \"movq %%rax,8(%%rdi)\\n\""},
{"lineNum":"  213","line":"    /* c >>= 52 */"},
{"lineNum":"  214","line":"    \"shrdq $52,%%r9,%%r8\\n\""},
{"lineNum":"  215","line":"    \"xorq %%r9,%%r9\\n\""},
{"lineNum":"  216","line":"    /* c += a2 * b0 */"},
{"lineNum":"  217","line":"    \"movq 0(%%rbx),%%rax\\n\""},
{"lineNum":"  218","line":"    \"mulq %%r12\\n\""},
{"lineNum":"  219","line":"    \"addq %%rax,%%r8\\n\""},
{"lineNum":"  220","line":"    \"adcq %%rdx,%%r9\\n\""},
{"lineNum":"  221","line":"    /* c += a1 * b1 */"},
{"lineNum":"  222","line":"    \"movq 8(%%rbx),%%rax\\n\""},
{"lineNum":"  223","line":"    \"mulq %%r11\\n\""},
{"lineNum":"  224","line":"    \"addq %%rax,%%r8\\n\""},
{"lineNum":"  225","line":"    \"adcq %%rdx,%%r9\\n\""},
{"lineNum":"  226","line":"    /* c += a0 * b2 (last use of %%r10 = a0) */"},
{"lineNum":"  227","line":"    \"movq 16(%%rbx),%%rax\\n\""},
{"lineNum":"  228","line":"    \"mulq %%r10\\n\""},
{"lineNum":"  229","line":"    \"addq %%rax,%%r8\\n\""},
{"lineNum":"  230","line":"    \"adcq %%rdx,%%r9\\n\""},
{"lineNum":"  231","line":"    /* fetch t3 (%%r10, overwrites a0), t4 (%%rsi) */"},
{"lineNum":"  232","line":"    \"movq %q2,%%rsi\\n\""},
{"lineNum":"  233","line":"    \"movq %q1,%%r10\\n\""},
{"lineNum":"  234","line":"    /* d += a4 * b3 */"},
{"lineNum":"  235","line":"    \"movq 24(%%rbx),%%rax\\n\""},
{"lineNum":"  236","line":"    \"mulq %%r14\\n\""},
{"lineNum":"  237","line":"    \"addq %%rax,%%rcx\\n\""},
{"lineNum":"  238","line":"    \"adcq %%rdx,%%r15\\n\""},
{"lineNum":"  239","line":"    /* d += a3 * b4 */"},
{"lineNum":"  240","line":"    \"movq 32(%%rbx),%%rax\\n\""},
{"lineNum":"  241","line":"    \"mulq %%r13\\n\""},
{"lineNum":"  242","line":"    \"addq %%rax,%%rcx\\n\""},
{"lineNum":"  243","line":"    \"adcq %%rdx,%%r15\\n\""},
{"lineNum":"  244","line":"    /* c += (d & M) * R */"},
{"lineNum":"  245","line":"    \"movq %%rcx,%%rax\\n\""},
{"lineNum":"  246","line":"    \"movq $0xfffffffffffff,%%rdx\\n\""},
{"lineNum":"  247","line":"    \"andq %%rdx,%%rax\\n\""},
{"lineNum":"  248","line":"    \"movq $0x1000003d10,%%rdx\\n\""},
{"lineNum":"  249","line":"    \"mulq %%rdx\\n\""},
{"lineNum":"  250","line":"    \"addq %%rax,%%r8\\n\""},
{"lineNum":"  251","line":"    \"adcq %%rdx,%%r9\\n\""},
{"lineNum":"  252","line":"    /* d >>= 52 (%%rcx only) */"},
{"lineNum":"  253","line":"    \"shrdq $52,%%r15,%%rcx\\n\""},
{"lineNum":"  254","line":"    /* r[2] = c & M */"},
{"lineNum":"  255","line":"    \"movq %%r8,%%rax\\n\""},
{"lineNum":"  256","line":"    \"movq $0xfffffffffffff,%%rdx\\n\""},
{"lineNum":"  257","line":"    \"andq %%rdx,%%rax\\n\""},
{"lineNum":"  258","line":"    \"movq %%rax,16(%%rdi)\\n\""},
{"lineNum":"  259","line":"    /* c >>= 52 */"},
{"lineNum":"  260","line":"    \"shrdq $52,%%r9,%%r8\\n\""},
{"lineNum":"  261","line":"    \"xorq %%r9,%%r9\\n\""},
{"lineNum":"  262","line":"    /* c += t3 */"},
{"lineNum":"  263","line":"    \"addq %%r10,%%r8\\n\""},
{"lineNum":"  264","line":"    /* c += d * R */"},
{"lineNum":"  265","line":"    \"movq %%rcx,%%rax\\n\""},
{"lineNum":"  266","line":"    \"movq $0x1000003d10,%%rdx\\n\""},
{"lineNum":"  267","line":"    \"mulq %%rdx\\n\""},
{"lineNum":"  268","line":"    \"addq %%rax,%%r8\\n\""},
{"lineNum":"  269","line":"    \"adcq %%rdx,%%r9\\n\""},
{"lineNum":"  270","line":"    /* r[3] = c & M */"},
{"lineNum":"  271","line":"    \"movq %%r8,%%rax\\n\""},
{"lineNum":"  272","line":"    \"movq $0xfffffffffffff,%%rdx\\n\""},
{"lineNum":"  273","line":"    \"andq %%rdx,%%rax\\n\""},
{"lineNum":"  274","line":"    \"movq %%rax,24(%%rdi)\\n\""},
{"lineNum":"  275","line":"    /* c >>= 52 (%%r8 only) */"},
{"lineNum":"  276","line":"    \"shrdq $52,%%r9,%%r8\\n\""},
{"lineNum":"  277","line":"    /* c += t4 (%%r8 only) */"},
{"lineNum":"  278","line":"    \"addq %%rsi,%%r8\\n\""},
{"lineNum":"  279","line":"    /* r[4] = c */"},
{"lineNum":"  280","line":"    \"movq %%r8,32(%%rdi)\\n\""},
{"lineNum":"  281","line":": \"+S\"(a), \"=m\"(tmp1), \"=m\"(tmp2), \"=m\"(tmp3)"},
{"lineNum":"  282","line":": \"b\"(b), \"D\"(r)","class":"lineCov","hits":"2","order":"321","possible_hits":"2",},
{"lineNum":"  283","line":": \"%rax\", \"%rcx\", \"%rdx\", \"%r8\", \"%r9\", \"%r10\", \"%r11\", \"%r12\", \"%r13\", \"%r14\", \"%r15\", \"cc\", \"memory\""},
{"lineNum":"  284","line":");"},
{"lineNum":"  285","line":"}","class":"linePartCov","hits":"2","order":"322","possible_hits":"4",},
{"lineNum":"  286","line":""},
{"lineNum":"  287","line":"SECP256K1_INLINE static void secp256k1_fe_sqr_inner(uint64_t *r, const uint64_t *a) {","class":"lineCov","hits":"4","order":"327","possible_hits":"4",},
{"lineNum":"  288","line":"/**"},
{"lineNum":"  289","line":" * Registers: rdx:rax = multiplication accumulator"},
{"lineNum":"  290","line":" *            r9:r8   = c"},
{"lineNum":"  291","line":" *            rcx:rbx = d"},
{"lineNum":"  292","line":" *            r10-r14 = a0-a4"},
{"lineNum":"  293","line":" *            r15     = M (0xfffffffffffff)"},
{"lineNum":"  294","line":" *            rdi     = r"},
{"lineNum":"  295","line":" *            rsi     = a / t?"},
{"lineNum":"  296","line":" */"},
{"lineNum":"  297","line":"  uint64_t tmp1, tmp2, tmp3;"},
{"lineNum":"  298","line":"__asm__ __volatile__(","class":"lineCov","hits":"4","order":"328","possible_hits":"4",},
{"lineNum":"  299","line":"    \"movq 0(%%rsi),%%r10\\n\""},
{"lineNum":"  300","line":"    \"movq 8(%%rsi),%%r11\\n\""},
{"lineNum":"  301","line":"    \"movq 16(%%rsi),%%r12\\n\""},
{"lineNum":"  302","line":"    \"movq 24(%%rsi),%%r13\\n\""},
{"lineNum":"  303","line":"    \"movq 32(%%rsi),%%r14\\n\""},
{"lineNum":"  304","line":"    \"movq $0xfffffffffffff,%%r15\\n\""},
{"lineNum":"  305","line":""},
{"lineNum":"  306","line":"    /* d = (a0*2) * a3 */"},
{"lineNum":"  307","line":"    \"leaq (%%r10,%%r10,1),%%rax\\n\""},
{"lineNum":"  308","line":"    \"mulq %%r13\\n\""},
{"lineNum":"  309","line":"    \"movq %%rax,%%rbx\\n\""},
{"lineNum":"  310","line":"    \"movq %%rdx,%%rcx\\n\""},
{"lineNum":"  311","line":"    /* d += (a1*2) * a2 */"},
{"lineNum":"  312","line":"    \"leaq (%%r11,%%r11,1),%%rax\\n\""},
{"lineNum":"  313","line":"    \"mulq %%r12\\n\""},
{"lineNum":"  314","line":"    \"addq %%rax,%%rbx\\n\""},
{"lineNum":"  315","line":"    \"adcq %%rdx,%%rcx\\n\""},
{"lineNum":"  316","line":"    /* c = a4 * a4 */"},
{"lineNum":"  317","line":"    \"movq %%r14,%%rax\\n\""},
{"lineNum":"  318","line":"    \"mulq %%r14\\n\""},
{"lineNum":"  319","line":"    \"movq %%rax,%%r8\\n\""},
{"lineNum":"  320","line":"    \"movq %%rdx,%%r9\\n\""},
{"lineNum":"  321","line":"    /* d += (c & M) * R */"},
{"lineNum":"  322","line":"    \"andq %%r15,%%rax\\n\""},
{"lineNum":"  323","line":"    \"movq $0x1000003d10,%%rdx\\n\""},
{"lineNum":"  324","line":"    \"mulq %%rdx\\n\""},
{"lineNum":"  325","line":"    \"addq %%rax,%%rbx\\n\""},
{"lineNum":"  326","line":"    \"adcq %%rdx,%%rcx\\n\""},
{"lineNum":"  327","line":"    /* c >>= 52 (%%r8 only) */"},
{"lineNum":"  328","line":"    \"shrdq $52,%%r9,%%r8\\n\""},
{"lineNum":"  329","line":"    /* t3 (tmp1) = d & M */"},
{"lineNum":"  330","line":"    \"movq %%rbx,%%rsi\\n\""},
{"lineNum":"  331","line":"    \"andq %%r15,%%rsi\\n\""},
{"lineNum":"  332","line":"    \"movq %%rsi,%q1\\n\""},
{"lineNum":"  333","line":"    /* d >>= 52 */"},
{"lineNum":"  334","line":"    \"shrdq $52,%%rcx,%%rbx\\n\""},
{"lineNum":"  335","line":"    \"xorq %%rcx,%%rcx\\n\""},
{"lineNum":"  336","line":"    /* a4 *= 2 */"},
{"lineNum":"  337","line":"    \"addq %%r14,%%r14\\n\""},
{"lineNum":"  338","line":"    /* d += a0 * a4 */"},
{"lineNum":"  339","line":"    \"movq %%r10,%%rax\\n\""},
{"lineNum":"  340","line":"    \"mulq %%r14\\n\""},
{"lineNum":"  341","line":"    \"addq %%rax,%%rbx\\n\""},
{"lineNum":"  342","line":"    \"adcq %%rdx,%%rcx\\n\""},
{"lineNum":"  343","line":"    /* d+= (a1*2) * a3 */"},
{"lineNum":"  344","line":"    \"leaq (%%r11,%%r11,1),%%rax\\n\""},
{"lineNum":"  345","line":"    \"mulq %%r13\\n\""},
{"lineNum":"  346","line":"    \"addq %%rax,%%rbx\\n\""},
{"lineNum":"  347","line":"    \"adcq %%rdx,%%rcx\\n\""},
{"lineNum":"  348","line":"    /* d += a2 * a2 */"},
{"lineNum":"  349","line":"    \"movq %%r12,%%rax\\n\""},
{"lineNum":"  350","line":"    \"mulq %%r12\\n\""},
{"lineNum":"  351","line":"    \"addq %%rax,%%rbx\\n\""},
{"lineNum":"  352","line":"    \"adcq %%rdx,%%rcx\\n\""},
{"lineNum":"  353","line":"    /* d += c * R */"},
{"lineNum":"  354","line":"    \"movq %%r8,%%rax\\n\""},
{"lineNum":"  355","line":"    \"movq $0x1000003d10,%%rdx\\n\""},
{"lineNum":"  356","line":"    \"mulq %%rdx\\n\""},
{"lineNum":"  357","line":"    \"addq %%rax,%%rbx\\n\""},
{"lineNum":"  358","line":"    \"adcq %%rdx,%%rcx\\n\""},
{"lineNum":"  359","line":"    /* t4 = d & M (%%rsi) */"},
{"lineNum":"  360","line":"    \"movq %%rbx,%%rsi\\n\""},
{"lineNum":"  361","line":"    \"andq %%r15,%%rsi\\n\""},
{"lineNum":"  362","line":"    /* d >>= 52 */"},
{"lineNum":"  363","line":"    \"shrdq $52,%%rcx,%%rbx\\n\""},
{"lineNum":"  364","line":"    \"xorq %%rcx,%%rcx\\n\""},
{"lineNum":"  365","line":"    /* tx = t4 >> 48 (tmp3) */"},
{"lineNum":"  366","line":"    \"movq %%rsi,%%rax\\n\""},
{"lineNum":"  367","line":"    \"shrq $48,%%rax\\n\""},
{"lineNum":"  368","line":"    \"movq %%rax,%q3\\n\""},
{"lineNum":"  369","line":"    /* t4 &= (M >> 4) (tmp2) */"},
{"lineNum":"  370","line":"    \"movq $0xffffffffffff,%%rax\\n\""},
{"lineNum":"  371","line":"    \"andq %%rax,%%rsi\\n\""},
{"lineNum":"  372","line":"    \"movq %%rsi,%q2\\n\""},
{"lineNum":"  373","line":"    /* c = a0 * a0 */"},
{"lineNum":"  374","line":"    \"movq %%r10,%%rax\\n\""},
{"lineNum":"  375","line":"    \"mulq %%r10\\n\""},
{"lineNum":"  376","line":"    \"movq %%rax,%%r8\\n\""},
{"lineNum":"  377","line":"    \"movq %%rdx,%%r9\\n\""},
{"lineNum":"  378","line":"    /* d += a1 * a4 */"},
{"lineNum":"  379","line":"    \"movq %%r11,%%rax\\n\""},
{"lineNum":"  380","line":"    \"mulq %%r14\\n\""},
{"lineNum":"  381","line":"    \"addq %%rax,%%rbx\\n\""},
{"lineNum":"  382","line":"    \"adcq %%rdx,%%rcx\\n\""},
{"lineNum":"  383","line":"    /* d += (a2*2) * a3 */"},
{"lineNum":"  384","line":"    \"leaq (%%r12,%%r12,1),%%rax\\n\""},
{"lineNum":"  385","line":"    \"mulq %%r13\\n\""},
{"lineNum":"  386","line":"    \"addq %%rax,%%rbx\\n\""},
{"lineNum":"  387","line":"    \"adcq %%rdx,%%rcx\\n\""},
{"lineNum":"  388","line":"    /* u0 = d & M (%%rsi) */"},
{"lineNum":"  389","line":"    \"movq %%rbx,%%rsi\\n\""},
{"lineNum":"  390","line":"    \"andq %%r15,%%rsi\\n\""},
{"lineNum":"  391","line":"    /* d >>= 52 */"},
{"lineNum":"  392","line":"    \"shrdq $52,%%rcx,%%rbx\\n\""},
{"lineNum":"  393","line":"    \"xorq %%rcx,%%rcx\\n\""},
{"lineNum":"  394","line":"    /* u0 = (u0 << 4) | tx (%%rsi) */"},
{"lineNum":"  395","line":"    \"shlq $4,%%rsi\\n\""},
{"lineNum":"  396","line":"    \"movq %q3,%%rax\\n\""},
{"lineNum":"  397","line":"    \"orq %%rax,%%rsi\\n\""},
{"lineNum":"  398","line":"    /* c += u0 * (R >> 4) */"},
{"lineNum":"  399","line":"    \"movq $0x1000003d1,%%rax\\n\""},
{"lineNum":"  400","line":"    \"mulq %%rsi\\n\""},
{"lineNum":"  401","line":"    \"addq %%rax,%%r8\\n\""},
{"lineNum":"  402","line":"    \"adcq %%rdx,%%r9\\n\""},
{"lineNum":"  403","line":"    /* r[0] = c & M */"},
{"lineNum":"  404","line":"    \"movq %%r8,%%rax\\n\""},
{"lineNum":"  405","line":"    \"andq %%r15,%%rax\\n\""},
{"lineNum":"  406","line":"    \"movq %%rax,0(%%rdi)\\n\""},
{"lineNum":"  407","line":"    /* c >>= 52 */"},
{"lineNum":"  408","line":"    \"shrdq $52,%%r9,%%r8\\n\""},
{"lineNum":"  409","line":"    \"xorq %%r9,%%r9\\n\""},
{"lineNum":"  410","line":"    /* a0 *= 2 */"},
{"lineNum":"  411","line":"    \"addq %%r10,%%r10\\n\""},
{"lineNum":"  412","line":"    /* c += a0 * a1 */"},
{"lineNum":"  413","line":"    \"movq %%r10,%%rax\\n\""},
{"lineNum":"  414","line":"    \"mulq %%r11\\n\""},
{"lineNum":"  415","line":"    \"addq %%rax,%%r8\\n\""},
{"lineNum":"  416","line":"    \"adcq %%rdx,%%r9\\n\""},
{"lineNum":"  417","line":"    /* d += a2 * a4 */"},
{"lineNum":"  418","line":"    \"movq %%r12,%%rax\\n\""},
{"lineNum":"  419","line":"    \"mulq %%r14\\n\""},
{"lineNum":"  420","line":"    \"addq %%rax,%%rbx\\n\""},
{"lineNum":"  421","line":"    \"adcq %%rdx,%%rcx\\n\""},
{"lineNum":"  422","line":"    /* d += a3 * a3 */"},
{"lineNum":"  423","line":"    \"movq %%r13,%%rax\\n\""},
{"lineNum":"  424","line":"    \"mulq %%r13\\n\""},
{"lineNum":"  425","line":"    \"addq %%rax,%%rbx\\n\""},
{"lineNum":"  426","line":"    \"adcq %%rdx,%%rcx\\n\""},
{"lineNum":"  427","line":"    /* c += (d & M) * R */"},
{"lineNum":"  428","line":"    \"movq %%rbx,%%rax\\n\""},
{"lineNum":"  429","line":"    \"andq %%r15,%%rax\\n\""},
{"lineNum":"  430","line":"    \"movq $0x1000003d10,%%rdx\\n\""},
{"lineNum":"  431","line":"    \"mulq %%rdx\\n\""},
{"lineNum":"  432","line":"    \"addq %%rax,%%r8\\n\""},
{"lineNum":"  433","line":"    \"adcq %%rdx,%%r9\\n\""},
{"lineNum":"  434","line":"    /* d >>= 52 */"},
{"lineNum":"  435","line":"    \"shrdq $52,%%rcx,%%rbx\\n\""},
{"lineNum":"  436","line":"    \"xorq %%rcx,%%rcx\\n\""},
{"lineNum":"  437","line":"    /* r[1] = c & M */"},
{"lineNum":"  438","line":"    \"movq %%r8,%%rax\\n\""},
{"lineNum":"  439","line":"    \"andq %%r15,%%rax\\n\""},
{"lineNum":"  440","line":"    \"movq %%rax,8(%%rdi)\\n\""},
{"lineNum":"  441","line":"    /* c >>= 52 */"},
{"lineNum":"  442","line":"    \"shrdq $52,%%r9,%%r8\\n\""},
{"lineNum":"  443","line":"    \"xorq %%r9,%%r9\\n\""},
{"lineNum":"  444","line":"    /* c += a0 * a2 (last use of %%r10) */"},
{"lineNum":"  445","line":"    \"movq %%r10,%%rax\\n\""},
{"lineNum":"  446","line":"    \"mulq %%r12\\n\""},
{"lineNum":"  447","line":"    \"addq %%rax,%%r8\\n\""},
{"lineNum":"  448","line":"    \"adcq %%rdx,%%r9\\n\""},
{"lineNum":"  449","line":"    /* fetch t3 (%%r10, overwrites a0),t4 (%%rsi) */"},
{"lineNum":"  450","line":"    \"movq %q2,%%rsi\\n\""},
{"lineNum":"  451","line":"    \"movq %q1,%%r10\\n\""},
{"lineNum":"  452","line":"    /* c += a1 * a1 */"},
{"lineNum":"  453","line":"    \"movq %%r11,%%rax\\n\""},
{"lineNum":"  454","line":"    \"mulq %%r11\\n\""},
{"lineNum":"  455","line":"    \"addq %%rax,%%r8\\n\""},
{"lineNum":"  456","line":"    \"adcq %%rdx,%%r9\\n\""},
{"lineNum":"  457","line":"    /* d += a3 * a4 */"},
{"lineNum":"  458","line":"    \"movq %%r13,%%rax\\n\""},
{"lineNum":"  459","line":"    \"mulq %%r14\\n\""},
{"lineNum":"  460","line":"    \"addq %%rax,%%rbx\\n\""},
{"lineNum":"  461","line":"    \"adcq %%rdx,%%rcx\\n\""},
{"lineNum":"  462","line":"    /* c += (d & M) * R */"},
{"lineNum":"  463","line":"    \"movq %%rbx,%%rax\\n\""},
{"lineNum":"  464","line":"    \"andq %%r15,%%rax\\n\""},
{"lineNum":"  465","line":"    \"movq $0x1000003d10,%%rdx\\n\""},
{"lineNum":"  466","line":"    \"mulq %%rdx\\n\""},
{"lineNum":"  467","line":"    \"addq %%rax,%%r8\\n\""},
{"lineNum":"  468","line":"    \"adcq %%rdx,%%r9\\n\""},
{"lineNum":"  469","line":"    /* d >>= 52 (%%rbx only) */"},
{"lineNum":"  470","line":"    \"shrdq $52,%%rcx,%%rbx\\n\""},
{"lineNum":"  471","line":"    /* r[2] = c & M */"},
{"lineNum":"  472","line":"    \"movq %%r8,%%rax\\n\""},
{"lineNum":"  473","line":"    \"andq %%r15,%%rax\\n\""},
{"lineNum":"  474","line":"    \"movq %%rax,16(%%rdi)\\n\""},
{"lineNum":"  475","line":"    /* c >>= 52 */"},
{"lineNum":"  476","line":"    \"shrdq $52,%%r9,%%r8\\n\""},
{"lineNum":"  477","line":"    \"xorq %%r9,%%r9\\n\""},
{"lineNum":"  478","line":"    /* c += t3 */"},
{"lineNum":"  479","line":"    \"addq %%r10,%%r8\\n\""},
{"lineNum":"  480","line":"    /* c += d * R */"},
{"lineNum":"  481","line":"    \"movq %%rbx,%%rax\\n\""},
{"lineNum":"  482","line":"    \"movq $0x1000003d10,%%rdx\\n\""},
{"lineNum":"  483","line":"    \"mulq %%rdx\\n\""},
{"lineNum":"  484","line":"    \"addq %%rax,%%r8\\n\""},
{"lineNum":"  485","line":"    \"adcq %%rdx,%%r9\\n\""},
{"lineNum":"  486","line":"    /* r[3] = c & M */"},
{"lineNum":"  487","line":"    \"movq %%r8,%%rax\\n\""},
{"lineNum":"  488","line":"    \"andq %%r15,%%rax\\n\""},
{"lineNum":"  489","line":"    \"movq %%rax,24(%%rdi)\\n\""},
{"lineNum":"  490","line":"    /* c >>= 52 (%%r8 only) */"},
{"lineNum":"  491","line":"    \"shrdq $52,%%r9,%%r8\\n\""},
{"lineNum":"  492","line":"    /* c += t4 (%%r8 only) */"},
{"lineNum":"  493","line":"    \"addq %%rsi,%%r8\\n\""},
{"lineNum":"  494","line":"    /* r[4] = c */"},
{"lineNum":"  495","line":"    \"movq %%r8,32(%%rdi)\\n\""},
{"lineNum":"  496","line":": \"+S\"(a), \"=m\"(tmp1), \"=m\"(tmp2), \"=m\"(tmp3)"},
{"lineNum":"  497","line":": \"D\"(r)","class":"lineCov","hits":"2","order":"329","possible_hits":"2",},
{"lineNum":"  498","line":": \"%rax\", \"%rbx\", \"%rcx\", \"%rdx\", \"%r8\", \"%r9\", \"%r10\", \"%r11\", \"%r12\", \"%r13\", \"%r14\", \"%r15\", \"cc\", \"memory\""},
{"lineNum":"  499","line":");"},
{"lineNum":"  500","line":"}","class":"linePartCov","hits":"2","order":"330","possible_hits":"4",},
{"lineNum":"  501","line":""},
{"lineNum":"  502","line":"#endif"},
]};
var percent_low = 25;var percent_high = 75;
var header = { "command" : "bpplus_debug", "date" : "2023-08-25 16:08:32", "instrumented" : 8, "covered" : 8,};
var merged_data = [];
