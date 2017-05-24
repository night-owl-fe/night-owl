### bindNodeCallback
public static bindNodeCallback(func: function, selector: function, scheduler: Scheduler): function(...params: *): Observable

将以Node.js风格的回调函数为API的函数转换为Observable。

> 和bindCallback一样，差别是回调函数的格式callback(error, result).
