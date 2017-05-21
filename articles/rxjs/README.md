# Rxjs翻译

## 操作符类别
不同的目的有不同的操作符，它们大概有这些类别：creation, transformation, filtering, combination, multicasting, error handling, utility等等
下面列出了所有的操作符。

### Creation Operators

* ajax
* bindCallback
* bindNodeCallback
* create
* defer
* empty
* from
* fromEvent
* fromEventPattern
* fromPromise
* generate
* interval
* never
* of
* repeat
* repeatWhen
* range
* throw
* timer

### Transformation Operators

* buffer
* bufferCount
* bufferTime
* bufferToggle
* bufferWhen
* concatMap
* concatMapTo
* exhaustMap
* expand
* groupBy
* map
* mapTo
* mergeMap
* mergeMapTo
* mergeScan
* pairwise
* partition
* pluck
* scan
* switchMap
* switchMapTo
* window
* windowCount
* windowTime
* windowToggle
* windowWhen

### Filtering Operators

* debounce
* debounceTime
* distinct
* distinctKey
* distinctUntilChanged
* distinctUntilKeyChanged
* elementAt
* filter
* first
* ignoreElements
* audit
* auditTime
* last
* sample
* sampleTime
* single
* skip
* skipUntil
* skipWhile
* take
* takeLast
* takeUntil
* takeWhile
* throttle
* throttleTime

### Combination Operators

* combineAll
* combineLatest
* concat
* concatAll
* exhaust
* forkJoin
* merge
* mergeAll
* race
* startWith
* switch
* withLatestFrom
* zip
* zipAll

### Multicasting Operators

* cache
* multicast
* publish
* publishBehavior
* publishLast
* publishReplay
* share

### Error Handling Operators

* catch
* retry
* retryWhen

### Utility Operators

* do
* delay
* delayWhen
* dematerialize
* finally
* let
* materialize
* observeOn
* subscribeOn
* timeInterval
* timestamp
* timeout
* timeoutWith
* toArray
* toPromise

### Conditional and Boolean Operators

* defaultIfEmpty
* every
* find
* findIndex
* isEmpty

### Mathematical and Aggregate Operators

* count
* max
* min
* reduce