# javascript regex
https://juejin.im/post/5965943ff265da6c30653879
https://zhuanlan.zhihu.com/p/27653434
## 正则是匹配模式，要么匹配字符，要么匹配位置
## 在正则中可以使用括号捕获数据，要么在API中进行分组引用，要么在正则里进行反向引用
## 6个锚字符 ^ $ \b \B (?=p) (?!p) (?<=p) (?<!p)
* ^（脱字符）匹配开头，在多行匹配中匹配行开头
* $（美元符号）匹配结尾，在多行匹配中匹配行结尾
* \b是单词边界，具体就是\w和\W之间的位置，也包括\w和^之间的位置，也包括\w和$之间的位置
* y(?=x) positive lookahead(正向先行断言) 要求y接下来的字符与x匹配，但不能包括x的那些字符（因为x表示的是x前面的那个位置）
* y(?!x) negative lookahead(负向先行断言) 要求y接下来的字符与x不匹配
* (?<=x)y positive lookbehind(正向后行断言) 要求y只有在x后面才匹配
* (?<!x)y negative lookbehind(负向后行断言) 要求y只有不在x后面才匹配