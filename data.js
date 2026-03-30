// Full BTech C++ Curriculum Data Source
const cppCurriculum = [
  {
    id: "basics",
    title: "1. Basics & Fundamentals",
    topics: [
      {
        id: "intro-cpp",
        title: "Introduction to C++",
        theory: "C++ is a high-performance, compiled language used widely in systems, games, and large-scale applications.",
        examples: [
          { title: "Skeleton", code: "#include <iostream>\nusing namespace std;\nint main() { cout << \"Hello!\"; return 0; }", output: "Hello!", explanation: "Standard C++ structure." }
        ],
        practice: { task: "Print your name using cout.", requiredKeywords: ["cout", "main"], hint: "cout << \"Your Name\";" }
      },
      {
        id: "datatypes",
        title: "Data Types & Casting",
        theory: "Data types define variable sizes. Casting converts one type to another explicitly or implicitly.",
        examples: [
          { title: "Casting", code: "double d = 9.5; int i = (int)d;", output: "i = 9", explanation: "Explicit casting to int." }
        ],
        practice: { task: "Cast a float to int.", requiredKeywords: ["float", "int"], hint: "int x = (int)f;" }
      },
      {
        id: "operators-bitwise",
        title: "Operators & Bitwise",
        theory: "Bitwise operators (&, |, ^) perform operations on bits of an integer.",
        examples: [
          { title: "Bitwise AND", code: "5 & 1", output: "1", explanation: "101 & 001 = 001" }
        ],
        practice: { task: "Use XOR operator (^).", requiredKeywords: ["^"], hint: "x ^ y" }
      },
      {
        id: "io-streams",
        title: "Input & Output",
        theory: "cin is used for input, cout for output. getline() is used for reading full lines.",
        examples: [
          { title: "Input", code: "int x; cin >> x;", output: "(User input)", explanation: "Reading an integer." }
        ],
        practice: { task: "Read input using cin.", requiredKeywords: ["cin"], hint: "cin >> x;" }
      }
    ]
  },
  {
    id: "control-flow",
    title: "2. Control Flow",
    topics: [
      {
        id: "conditionals",
        title: "Conditionals (If, Switch)",
        theory: "Conditionals execute blocks based on boolean results.",
        examples: [
          { title: "If-Else", code: "if(x > 0) cout << \"Pos\";", output: "Pos", explanation: "Simple check." }
        ],
        practice: { task: "Write an if statement.", requiredKeywords: ["if"], hint: "if(condition) { ... }" }
      },
      {
        id: "loops",
        title: "Loops (For, While, Do)",
        theory: "Repeat tasks while a condition is true.",
        examples: [
          { title: "For Loop", code: "for(int i=0; i<5; i++);", output: "(Loops 5 times)", explanation: "Classic counter loop." }
        ],
        practice: { task: "Write a while loop.", requiredKeywords: ["while"], hint: "while(condition) { ... }" }
      },
      {
        id: "nested-loops",
        title: "Nested Loops & Patterns",
        theory: "Loops inside loops, often used for matrices or geometric patterns.",
        examples: [
          { title: "Star Pattern", code: "for(...) for(...) cout << \"*\";", output: "****", explanation: "Rows and columns." }
        ],
        practice: { task: "Use two nested for loops.", requiredKeywords: ["for", "for"], hint: "for(...) { for(...) { ... } }" }
      }
    ]
  },
  {
    id: "functions",
    title: "3. Functions & Recursion",
    topics: [
      {
        id: "func-basics",
        title: "Function Fundamentals",
        theory: "Modular blocks of code that perform specific tasks.",
        examples: [
          { title: "Definition", code: "void greet() { cout << \"Hi\"; }", output: "Hi", explanation: "Void function." }
        ],
        practice: { task: "Define a function named 'add'.", requiredKeywords: ["void", "add", "()"], hint: "void add() { ... }" }
      },
      {
        id: "call-by",
        title: "Call by Value/Ref",
        theory: "Passing values vs addresses to functions.",
        examples: [
          { title: "By Reference", code: "void swap(int &a, int &b)", output: "(Swaps originals)", explanation: "Using '&' reference." }
        ],
        practice: { task: "Pass a variable by reference using &.", requiredKeywords: ["&"], hint: "void func(int &x)" }
      },
      {
        id: "recursion",
        title: "Recursion",
        theory: "A function that calls itself. Essential for complex algorithms.",
        examples: [
          { title: "Factorial", code: "int fact(int n) { if(n<=1) return 1; return n*fact(n-1); }", output: "factorial size", explanation: "Base case + recursions." }
        ],
        practice: { task: "Call 'fact' inside itself.", requiredKeywords: ["fact", "return"], hint: "return n * fact(n-1);" }
      },
      {
        id: "inline-func",
        title: "Inline Functions",
        theory: "Requests the compiler to replace function calls with actual code to save time.",
        examples: [
          { title: "Inline", code: "inline int sq(int x) { return x*x; }", output: "x squared", explanation: "Using 'inline' keyword." }
        ],
        practice: { task: "Use the inline keyword.", requiredKeywords: ["inline"], hint: "inline void func() { ... }" }
      }
    ]
  },
  {
    id: "arrays-strings",
    title: "4. Arrays & Strings",
    topics: [
      {
        id: "arrays-1d",
        title: "1D Arrays",
        theory: "Collection of similar data types stored sequentially.",
        examples: [
          { title: "Declaration", code: "int arr[5] = {1,2,3,4,5};", output: "arr[0] is 1", explanation: "Array of 5 integers." }
        ],
        practice: { task: "Declare an array of size 10.", requiredKeywords: ["int", "[10]"], hint: "int arr[10];" }
      },
      {
        id: "arrays-2d",
        title: "2D Arrays (Matrices)",
        theory: "Arrays of arrays, mapping directly to mathematical matrices.",
        examples: [
          { title: "Matrix", code: "int mat[2][2] = {{1,2},{3,4}};", output: "2x2 grid", explanation: "Zero-indexed access." }
        ],
        practice: { task: "Declare a 3x3 matrix.", requiredKeywords: ["[3][3]"], hint: "int a[3][3];" }
      },
      {
        id: "strings-class",
        title: "Strings (C++ String Class)",
        theory: "Safe and powerful way to handle collections of characters.",
        examples: [
          { title: "Strings", code: "string s = \"College\";", output: "College", explanation: "Part of std namespace." }
        ],
        practice: { task: "Declare a string variable 'name'.", requiredKeywords: ["string", "name"], hint: "string name = \"...\";" }
      }
    ]
  },
  {
    id: "pointers",
    title: "5. Pointers",
    topics: [
      {
        id: "ptr-basics",
        title: "Pointer Basics",
        theory: "Variable that stores the memory address of another variable.",
        examples: [
          { title: "Dereferencing", code: "int x=10; int *p = &x; cout << *p;", output: "10", explanation: "p points to x." }
        ],
        practice: { task: "Declare an integer pointer '*ptr'.", requiredKeywords: ["int", "*ptr"], hint: "int *ptr;" }
      },
      {
        id: "ptr-arith",
        title: "Pointer Arithmetic",
        theory: "Performing mathematical operations on addresses.",
        examples: [
          { title: "Increment", code: "ptr++; // moves to next int block", output: "Next address", explanation: "Scales by type size." }
        ],
        practice: { task: "Increment a pointer.", requiredKeywords: ["++"], hint: "ptr++;" }
      }
    ]
  },
  {
    id: "structs",
    title: "6. Structures & Unions",
     topics: [
      {
        id: "struct-basics",
        title: "Structures (struct)",
        theory: "User-defined data type grouping variables of different types.",
        examples: [
          { title: "Structure", code: "struct Std { int roll; };", output: "Std s; s.roll=1;", explanation: "Defining a struct." }
        ],
        practice: { task: "Declare a struct named 'Point'.", requiredKeywords: ["struct", "Point"], hint: "struct Point { ... };" }
      },
      {
        id: "unions",
        title: "Unions",
        theory: "Similar to structs but members share the same memory location.",
        examples: [
          { title: "Union", code: "union Data { int i; char c; };", output: "Shares memory", explanation: "Space-optimized." }
        ],
        practice: { task: "Use the union keyword.", requiredKeywords: ["union"], hint: "union Box { ... };" }
      }
    ]
  },
  {
    id: "oop",
    title: "7. Object Oriented Programming",
    topics: [
      {
        id: "classes",
        title: "Classes & Objects",
        theory: "Blueprints (classes) and instances (objects). Data hiding via private/public.",
        examples: [
          { title: "Class", code: "class Car { public: void drive(); };", output: "Car c; c.drive();", explanation: "Encapsulation start." }
        ],
        practice: { task: "Define a class 'Dog'.", requiredKeywords: ["class", "Dog"], hint: "class Dog { ... };" }
      },
      {
        id: "constructors",
        title: "Constructors & Destructors",
        theory: "Automatic initialization and cleanup of objects.",
        examples: [
          { title: "Constructor", code: "Car() { cout << \"Built\"; }", output: "Built", explanation: "Called on creation." }
        ],
        practice: { task: "Declare a constructor for class 'User'.", requiredKeywords: ["User", "()"], hint: "User() { ... }" }
      },
      {
        id: "inheritance",
        title: "Inheritance Types",
        theory: "Deriving properties from base classes. Single, Multiple, Multilevel, etc.",
        examples: [
          { title: "Inherit", code: "class B : public A {};", output: "B inherits A", explanation: "Code reusability." }
        ],
        practice: { task: "Inherit class 'B' from 'A' publicly.", requiredKeywords: ["public", "A"], hint: "class B : public A { ... };" }
      },
      {
        id: "polymorphism",
        title: "Polymorphism (Overloading)",
        theory: "Same name, different functionality. Compile-time polymorphism.",
        examples: [
          { title: "Func Overloading", code: "void add(int); void add(float);", output: "Different adds", explanation: "Overloading via params." }
        ],
        practice: { task: "Define two functions with the same name.", requiredKeywords: ["void", "void"], hint: "void f(); void f(int x);" }
      },
      {
        id: "virtual-func",
        title: "Virtual Functions",
        theory: "Dynamically binds function calls at runtime. Key to overriding.",
        examples: [
          { title: "Virtual", code: "virtual void show();", output: "Runtime binding", explanation: "Late binding." }
        ],
        practice: { task: "Use the virtual keyword.", requiredKeywords: ["virtual"], hint: "virtual void display() = 0;" }
      }
    ]
  },
  {
    id: "advanced",
    title: "8. Advanced C++",
    topics: [
      {
        id: "file-handling",
        title: "File Handling",
        theory: "fstreams are used to read and write data to external files.",
        examples: [
          { title: "Write", code: "ofstream f(\"hi.txt\");", output: "File created", explanation: "Output file stream." }
        ],
        practice: { task: "Use ofstream class.", requiredKeywords: ["ofstream"], hint: "ofstream out(\"data.txt\");" }
      },
      {
        id: "exceptions",
        title: "Exception Handling",
        theory: "Handle runtime errors gracefully using try, throw, and catch blocks.",
        examples: [
          { title: "Try Catch", code: "try { throw \"err\"; } catch(...) {}", output: "Error caught", explanation: "Try block isolates error code." }
        ],
        practice: { task: "Use try and catch keywords.", requiredKeywords: ["try", "catch"], hint: "try { ... } catch(...) { ... }" }
      },
      {
        id: "templates",
        title: "Templates",
        theory: "Enable generic programming by writing code that works with any data type.",
        examples: [
          { title: "Template", code: "template <typename T> T add(T a, T b);", output: "Works for all types", explanation: "Generic function." }
        ],
        practice: { task: "Use the template keyword.", requiredKeywords: ["template", "<typename"], hint: "template <typename T> class X { ... };" }
      }
    ]
  }
];

window.cppCurriculum = cppCurriculum;
