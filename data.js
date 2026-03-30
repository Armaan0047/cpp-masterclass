// Full BTech C++ Curriculum Data Source with Enhanced Content
const cppCurriculum = [
  {
    id: "basics",
    title: "1. Basics & Fundamentals",
    topics: [
      {
        id: "intro-cpp",
        title: "Introduction to C++",
        theory: "C++ is a powerful, high-performance, compiled language used widely in systems, game engines, and large-scale applications. Developed by Bjarne Stroustrup, it extends the C language with object-oriented features. Its versatility allows for both low-level memory manipulation and high-level abstractions, making it indispensable for software where speed is critical.",
        realLifeExample: "Imagine C++ as an architect's detailed blueprint. While C provides the raw materials like bricks and mortar, C++ adds the structural design and reusable patterns to build skyscrapers efficiently.",
        examples: [
          { title: "Standard Skeleton", code: "#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << \"Welcome to C++!\";\n    return 0;\n}", output: "Welcome to C++!", explanation: "The basic structure includes the header, namespace, and main entry point." },
          { title: "Single Line Comments", code: "// This is a comment\n#include <iostream>\nint main() { return 0; }", output: "(No output)", explanation: "Comments are used for documentation and are ignored by the compiler." },
          { title: "Multi-line Comments", code: "/* This is a \n   multi-line comment */\n#include <iostream>\nint main() { return 0; }", output: "(No output)", explanation: "Use multi-line comments for longer explanations within your code." }
        ],
        practice: { 
          task: "Write a program that uses cout to print 'Hello BTech'.", 
          initialCode: "#include <iostream>\nusing namespace std;\n\nint main() {\n    // Code here\n    return 0;\n}",
          requiredKeywords: ["cout", "main"], 
          hint: "Use cout << \"Hello BTech\";" 
        },
        didYouKnow: "C++ was originally called 'C with Classes' before its name was officially changed in 1983.",
        commonMistakes: ["Forgetting the semicolon after a statement.", "Misspelling 'iostream' as 'iostreem'."],
        quickTip: "Always use meaningful variable names to make your code easier for others to read."
      },
      {
        id: "datatypes",
        title: "Data Types & Casting",
        theory: "Data types identify the kind of data a variable can store, such as integers, decimals, or characters. C++ is a statically-typed language, meaning all variables must have a defined type at compile time. Type casting allows you to convert a variable from one data type to another, which is essential when performing operations across different types.",
        realLifeExample: "Think of data types as different sized boxes. An 'int' box fits whole numbers, while a 'float' box fits items with decimals. Type casting is like repackaging an item into a different box to make it fit a specific shelf.",
        examples: [
          { title: "Implicit Casting", code: "int x = 10;\ndouble y = x; // y becomes 10.0", output: "(No output)", explanation: "The compiler automatically converts smaller types to larger types without data loss." },
          { title: "Explicit Casting", code: "double d = 9.99;\nint i = (int)d; // i becomes 9", output: "(No output)", explanation: "Manual conversion using (type) syntax. Note that decimals are truncated." },
          { title: "Sizeof Operator", code: "#include <iostream>\nusing namespace std;\nint main() {\n    cout << sizeof(int) << \" bytes\";\n    return 0;\n}", output: "4 bytes", explanation: "The sizeof operator returns the size of a data type in bytes." }
        ],
        practice: { 
          task: "Declare a float 'f' as 5.5 and cast it to an integer 'i'.", 
          initialCode: "int main() {\n    float f = 5.5;\n    int i = \n    return 0;\n}",
          requiredKeywords: ["float", "int", "(int)"], 
          hint: "Use int i = (int)f;" 
        },
        didYouKnow: "The 'double' type is called so because it provides double the precision of a 'float'.",
        commonMistakes: ["Trying to store a large double value into a small integer, causing overflow.", "Using 'int' for fractional values like price."],
        quickTip: "Use 'double' instead of 'float' for most scientific calculations to ensure higher accuracy."
      },
      {
        id: "operators-bitwise",
        title: "Operators & Bitwise",
        theory: "Operators are symbols that perform operations on variables and values. Bitwise operators are unique because they manipulate data at the binary level, treating integers as strings of bits (0s and 1s). These are crucial for low-level system programming, cryptography, and optimizing performance in resource-constrained environments.",
        realLifeExample: "Imagine a row of light switches. A bitwise operator can flip multiple switches at once based on a pattern, whereas normal operators might only flip one switch at a time.",
        examples: [
          { title: "Bitwise AND", code: "int a = 5; // 101\nint b = 1; // 001\nint res = a & b; // 001", output: "1", explanation: "Compares each bit; result is 1 ONLY if both bits are 1." },
          { title: "Bitwise OR", code: "int a = 5; // 101\nint b = 2; // 010\nint res = a | b; // 111", output: "7", explanation: "Result is 1 if either bit is 1." },
          { title: "Left Shift", code: "int x = 5; // 101\nint res = x << 1; // 1010", output: "10", explanation: "Shifting left by 1 bit effectively multiplies the number by 2." }
        ],
        practice: { 
          task: "Use the XOR operator (^) between two variables.", 
          initialCode: "int main() {\n    int a = 5, b = 3;\n    int res = \n    return 0;\n}",
          requiredKeywords: ["^"], 
          hint: "res = a ^ b;" 
        },
        didYouKnow: "Bitwise operations are much faster than traditional arithmetic operations like multiplication or division.",
        commonMistakes: ["Confusing '&' (bitwise AND) with '&&' (logical AND).", "Using bitwise operators on floating-point numbers."],
        quickTip: "A quick way to check if a number is even or odd is using 'n & 1'. If it's 1, the number is odd."
      },
      {
        id: "io-streams",
        title: "Input & Output",
        theory: "I/O streams in C++ provide a standardized way to read data from inputs and display it to outputs. The 'iostream' library uses 'cin' (standard input) and 'cout' (standard output) objects. Streams are treated as sequences of characters, making data flow smooth and manageable across different devices.",
        realLifeExample: "Think of an I/O stream as a conveyor belt. 'cin' is a belt bringing items into a factory, and 'cout' is a belt taking finished products out to a delivery truck.",
        examples: [
          { title: "Using cin", code: "int age;\ncout << \"Enter age: \";\ncin >> age;", output: "(User input)", explanation: "cin pulls data from the console buffer into variables." },
          { title: "Reading a Line", code: "string name;\ngetline(cin, name);", output: "(Full name)", explanation: "getline() reads an entire line, including spaces, unlike cin >>." },
          { title: "Output Formatting", code: "cout << \"Value: \" << 10 << endl;", output: "Value: 10", explanation: "endl inserts a newline and flushes the output buffer." }
        ],
        practice: { 
          task: "Read a number from the user using cin.", 
          initialCode: "int main() {\n    int n;\n    // Read n here\n    return 0;\n}",
          requiredKeywords: ["cin", ">>"], 
          hint: "Use cin >> x;" 
        },
        didYouKnow: "The 'c' in 'cin', 'cout', 'cerr' stands for 'console'.",
        commonMistakes: ["Using '<<' with cin instead of '>>'.", "Forgetting to include <string> when using string objects in I/O."],
        quickTip: "Using '\\n' instead of 'endl' is generally faster for performance because it doesn't force a buffer flush."
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
        theory: "Conditional statements allow your program to execute different branches of code based on specific conditions. The 'if-else' ladder handles boolean logic, while the 'switch' statement is ideal for comparing a single variable against multiple constant values. They are the primary tools for building decision-making logic.",
        realLifeExample: "Conditionals are like a GPS. IF you reach an intersection, THEN turn left; ELSE stay on the current road until the next instruction.",
        examples: [
          { title: "Else-If Ladder", code: "if(score > 90) cout << \"A\"; \nelse if(score > 80) cout << \"B\";\nelse cout << \"C\";", output: "B (if score=85)", explanation: "Checks conditions sequentially until one is met." },
          { title: "Switch Case", code: "switch(day) {\n  case 1: cout << \"Mon\"; break;\n  default: cout << \"Unknown\";\n}", output: "Mon (if day=1)", explanation: "Matches a variable against constant values for faster execution." },
          { title: "Ternary Operator", code: "int max = (a > b) ? a : b;", output: "(Depends on a/b)", explanation: "A shorthand for a simple if-else statement." }
        ],
        practice: { 
          task: "Write an if statement to check if 'x' is positive.", 
          initialCode: "int main() {\n    int x = 5;\n    // if condition here\n    return 0;\n}",
          requiredKeywords: ["if", "x", "0"], 
          hint: "if (x > 0) { ... }" 
        },
        didYouKnow: "The switch statement in C++ can only be used with integer-like types (char, int, enum).",
        commonMistakes: ["Forgetting 'break' in a switch statement, causing 'fall-through' logic.", "Using '=' instead of '==' in an if condition."],
        quickTip: "Keep your switch cases simple. If you have many logic-heavy cases, consider using functions or classes."
      },
      {
        id: "loops",
        title: "Loops (For, While, Do)",
        theory: "Loops enable blocks of code to be executed multiple times. The 'for' loop is perfect when iterations are known. The 'while' loop is used for continuing as long as a condition holds, and 'do-while' guarantees at least one execution since its condition is checked at the end.",
        realLifeExample: "Loops are like a workout session. 'Do 10 pushups' is a for-loop. 'Run until you feel tired' is a while-loop.",
        examples: [
          { title: "Simple For Loop", code: "for(int i=0; i<3; i++) {\n    cout << i << \" \";\n}", output: "0 1 2", explanation: "Initialization, condition, and increment happen in one line." },
          { title: "While Loop", code: "int i=0; \nwhile(i<3) {\n    cout << i++;\n}", output: "012", explanation: "Repeats as long as i is less than 3." },
          { title: "Break and Continue", code: "for(int i=0; i<5; i++) {\n  if(i==2) continue;\n  cout << i;\n}", output: "0134", explanation: "Continue skips the current iteration, while break stops the loop entirely." }
        ],
        practice: { 
          task: "Write a while loop that increments i from 0 to 4.", 
          initialCode: "int main() {\n    int i = 0;\n    while (i < 5) {\n        // increment i\n    }\n    return 0;\n}",
          requiredKeywords: ["while", "++"], 
          hint: "Use i++; inside the loop." 
        },
        didYouKnow: "Infinite loops are often used in game development to keep the game engine running until the player quits.",
        commonMistakes: ["Accidentally creating an infinite loop by forgetting to increment the loop variable.", "Off-by-one errors (looping one time too many or too few)."],
        quickTip: "Prefer 'for' loops for simple counting and 'while' loops for complex conditions."
      },
      {
        id: "nested-loops",
        title: "Nested Loops & Patterns",
        theory: "A nested loop is a loop inside another loop. The inner loop completes its full cycle for every single iteration of the outer loop. This is fundamental for working with multi-dimensional data like matrices or generating complex visual patterns on the console.",
        realLifeExample: "Nested loops are like the hands of a clock. The minute hand (inner loop) must complete 60 ticks before the hour hand (outer loop) moves once.",
        examples: [
          { title: "Square Pattern", code: "for(int i=0; i<2; i++) {\n  for(int j=0; j<2; j++) cout << \"*\";\n  cout << endl;\n}", output: "**\n**", explanation: "Outer loop for rows, inner loop for columns." },
          { title: "Matrix Traversal", code: "int m[2][2];\nfor(int i=0; i<2; i++)\n  for(int j=0; j<2; j++) cout << m[i][j];", output: "(Values)", explanation: "The standard way to access cells in multi-dimensional arrays." },
          { title: "Triangle", code: "for(int i=0; i<3; i++) {\n  for(int j=0; j<=i; j++) cout << \"*\";\n  cout << endl;\n}", output: "*\n**\n***", explanation: "The inner loop limit depends on the outer loop variable." }
        ],
        practice: { 
          task: "Use two nested for loops.", 
          initialCode: "int main() {\n    // nested loops here\n    return 0;\n}",
          requiredKeywords: ["for", "for"], 
          hint: "for(...) { for(...) { ... } }" 
        },
        didYouKnow: "Nested loops are the basis for almost all sorting algorithms like Bubble sort or Selection sort.",
        commonMistakes: ["Using the same variable name (like 'i') for both nested loops.", "Forgetting the newline between rows in pattern programs."],
        quickTip: "When writing patterns, think of the outer loop as 'Row' and inner loop as 'Column'."
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
        theory: "Functions are independent modules of code that perform specific tasks and can be reused throughout a program. They help break large programs into manageable pieces, following the 'Don't Repeat Yourself' (DRY) principle. A function typically has a return type, a name, parameters, and a body of code.",
        realLifeExample: "Functions are like recipes in a cookbook. You define the recipe once (declaration) and use it whenever you want to bake a cake (call), giving it different ingredients (parameters).",
        examples: [
          { title: "Void Function", code: "void greet() {\n    cout << \"Hello student!\";\n}", output: "(Direct output)", explanation: "A void function does not return any value to the caller." },
          { title: "Return Value", code: "int add(int a, int b) {\n    return a + b;\n}", output: "(Integer)", explanation: "Returns a value back to where it was called." },
          { title: "Parameters", code: "void printVal(int x) {\n    cout << x;\n}", output: "(Value of x)", explanation: "Parameters allow you to pass specific data into the function logic." }
        ],
        practice: { 
          task: "Define a function 'add' that returns int.", 
          initialCode: "// define here\n\nint main() {\n    return 0;\n}",
          requiredKeywords: ["int", "add", "return"], 
          hint: "int add(int a, int b) { return a+b; }" 
        },
        didYouKnow: "Every C++ program starts its journey from the main() function.",
        commonMistakes: ["Forgetting to declare the return type of the function.", "Returning the wrong type of value from a function."],
        quickTip: "Keep your functions short. If a function is more than 30 lines, it probably should be split up."
      },
      {
        id: "call-by",
        title: "Call by Value/Ref",
        theory: "Specifies how arguments are passed to a function. Call by Value creates a copy, so changes don't affect the original. Call by Reference (using '&') passes the actual memory address, allowing the function to modify the original variable directly.",
        realLifeExample: "Call by Value is like giving someone a photocopy of a document. They can mark it up, but your original is safe. Call by Reference is like giving them the original document; any mark they make is permanent.",
        examples: [
          { title: "By Value", code: "void f(int n) { n = 20; }\nint x = 10; f(x); // x is 10", output: "10", explanation: "Changes only happen to the copy inside the function." },
          { title: "By Reference", code: "void f(int &n) { n = 20; }\nint x = 10; f(x); // x is 20", output: "20", explanation: "The original variable is modified directly in memory." },
          { title: "Swap", code: "void swap(int &a, int &b) { int t=a; a=b; b=t; }", output: "(Swapped values)", explanation: "A classic example that requires passing by reference." }
        ],
        practice: { 
          task: "Pass a variable 'x' by reference to 'mod'.", 
          initialCode: "void mod(int &n) {\n    n = 100;\n}\nint main() {\n    int x = 5;\n    // call here\n    return 0;\n}",
          requiredKeywords: ["mod", "x"], 
          hint: "mod(x);" 
        },
        didYouKnow: "References are internally just constant pointers that are automatically dereferenced by C++.",
        commonMistakes: ["Forgetting the '&' sign when you really need to change the original variable.", "Passing constants to functions that expect a non-const reference."],
        quickTip: "Use 'const' references for large objects to avoid copying without allowing them to be modified."
      },
      {
        id: "recursion",
        title: "Recursion",
        theory: "Recursion is when a function calls itself to solve a smaller version of the same problem. Every recursive function needs a 'Base Case' to stop the calls and a 'Recursive Step' to move toward that base case. It is extremely powerful for mathematical sequences like Factorial or Fibonacci.",
        realLifeExample: "Recursion is like looking into two parallel mirrors. You see an image within an image, each slightly smaller, until the reflections are too small to see (the base case).",
        examples: [
          { title: "Factorial", code: "int fact(int n) {\n  if(n<=1) return 1;\n  return n * fact(n-1);\n}", output: "120 (for 5)", explanation: "The function calls itself with n-1 until n reaches 1." },
          { title: "Sum of N", code: "int sum(int n) {\n  if(n==0) return 0;\n  return n + sum(n-1);\n}", output: "15 (for 5)", explanation: "Adds n to the result of sum(n-1)." },
          { title: "Countdown", code: "void count(int n) {\n  if(n==0) return;\n  cout << n; count(n-1);\n}", output: "321", explanation: "Prints n and then calls itself with a smaller n." }
        ],
        practice: { 
          task: "Write the recursive call for factorial.", 
          initialCode: "int fact(int n) {\n    if (n<=1) return 1;\n    // call here\n}",
          requiredKeywords: ["return", "fact"], 
          hint: "return n * fact(n-1);" 
        },
        didYouKnow: "Uncontrolled recursion can lead to a 'Stack Overflow' error, where the computer runs out of memory to store function calls.",
        commonMistakes: ["Forgetting the base case, leading to infinite self-calling.", "Recursive step that doesn't reduce the problem size."],
        quickTip: "Always draw a recursion tree on paper to visualize how the function calls itself."
      },
      {
        id: "inline-func",
        title: "Inline Functions",
        theory: "An inline function is a request to the compiler to replace the function call with the actual code. This eliminates the overhead of jumping to a function in memory, saving time at runtime. It's ideal for very small, frequently called functions that perform simple logic.",
        realLifeExample: "Inline functions are like pre-cut vegetables. Instead of stopping the cooking process to chop (calling a function), the vegetables are already ready to be tossed in (the code is already there).",
        examples: [
          { title: "Macro vs Inline", code: "inline int sq(int x) { return x*x; }", output: "(Result)", explanation: "Safer than macros because it respects scope and type checking." },
          { title: "Class Inline", code: "class A { public: void show() {} };", output: "(Inline by default)", explanation: "Member functions defined inside a class body are automatically requested as inline." },
          { title: "Performance", code: "inline void f() { ... }", output: "(Optimization)", explanation: "Reduces function call overhead for high-performance apps." }
        ],
        practice: { 
          task: "Define an inline function 'cube'.", 
          initialCode: "// define here\n\nint main() {\n    return 0;\n}",
          requiredKeywords: ["inline", "cube"], 
          hint: "inline int cube(int x) { return x*x*x; }" 
        },
        didYouKnow: "The inline keyword is only a 'suggestion' to the compiler; if a function is too large, it might ignore the request.",
        commonMistakes: ["Trying to inline complex functions with many lines of code.", "Inlining functions that use heavy recursion."],
        quickTip: "Only use 'inline' for functions that are roughly 1 to 5 lines of code."
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
        theory: "An array is a collection of variables of the same type stored in contiguous memory locations. Indexing starts at 0, meaning the first element is at 'arr[0]'. They are perfect for storing lists of fixed size like student marks or scores.",
        realLifeExample: "A 1D array is like a row of mailboxes in an apartment building. Each box has a number (index) and holds one envelope (data).",
        examples: [
          { title: "Creation", code: "int arr[3] = {1, 2, 3};", output: "arr[0]=1", explanation: "Allocates memory for 3 integers side-by-side." },
          { title: "Traversal", code: "for(int i=0; i<3; i++) cout << arr[i];", output: "123", explanation: "A loop is the standard way to visit every array element." },
          { title: "Max Find", code: "int m = arr[0]; for(...) if(arr[i]>m) m=arr[i];", output: "(Highest value)", explanation: "Compares current element with the max found so far." }
        ],
        practice: { 
          task: "Declare an int array 'myList' of size 10.", 
          initialCode: "int main() {\n    // array here\n    return 0;\n}",
          requiredKeywords: ["int", "myList", "[10]"], 
          hint: "int myList[10];" 
        },
        didYouKnow: "C++ doesn't check array bounds; you can accidentally access index 10 in a size-5 array, which is very dangerous.",
        commonMistakes: ["Starting array index at 1 instead of 0.", "Declaring an array of size 'n' where n is not a constant."],
        quickTip: "Always use a constant or a #define for array sizes to avoid error prone hard-coding."
      },
      {
        id: "arrays-2d",
        title: "2D Arrays (Matrices)",
        theory: "A 2D array is an array of arrays, representing data in rows and columns. It is the primary structure for implementing mathematical matrices, spreadsheets, or 2D game maps.",
        realLifeExample: "A 2D array is like a cinema seating chart. You have a Row number and a Seat number (e.g., Row 5, Seat 12) to find exactly where someone is sitting.",
        examples: [
          { title: "Grid Initialization", code: "int grid[2][2] = {{1,0}, {0,1}};", output: "Identity Matrix", explanation: "Represented as a list of rows." },
          { title: "Column Sum", code: "for(int j=0; j<2; j++) { ... }", output: "(Sums)", explanation: "Accessing vertical slices by keeping j constant." },
          { title: "Matrix Addition", code: "res[i][j] = a[i][j] + b[i][j];", output: "(Sum matrix)", explanation: "Elements added position by position." }
        ],
        practice: { 
          task: "Declare a 3x3 matrix named 'board'.", 
          initialCode: "int main() {\n    // code here\n    return 0;\n}",
          requiredKeywords: ["board", "[3][3]"], 
          hint: "int board[3][3];" 
        },
        didYouKnow: "Internally, 2D arrays are stored in 'Row Major' order, meaning Row 0 comes first, followed by Row 1, and so on.",
        commonMistakes: ["Swapping Row and Column index during nested loops.", "Forgetting the second dimension size in function parameters."],
        quickTip: "Initialize your 2D arrays using curly braces for each row for better readability."
      },
      {
        id: "strings-class",
        title: "Strings (C++ String Class)",
        theory: "The 'string' class in C++ is a dynamic and safer alternative to old-style character arrays. It manages memory automatically, allows for easy concatenation (+), and provides many built-in functions like length() and clear().",
        realLifeExample: "Strings are like magnetic poetry sets. You can easily add more words (concatenate) or count the letters without manually managing the space on the board.",
        examples: [
          { title: "Concat", code: "string a = \"C\"; string b = \"++\"; a += b;", output: "C++", explanation: "The '+' and '+=' operators are overloaded for string joining." },
          { title: "Substring", code: "string s = \"Hello\"; cout << s.substr(0,2);", output: "He", explanation: "Extracts a part of the string starting from an index." },
          { title: "Length", code: "cout << s.size();", output: "5", explanation: "Returns the number of characters in the string." }
        ],
        practice: { 
          task: "Declare 's' and set it to 'Code'.", 
          initialCode: "int main() {\n    // string s\n    return 0;\n}",
          requiredKeywords: ["string", "s", "Code"], 
          hint: "string s = \"Code\";" 
        },
        didYouKnow: "In C++, strings can grow and shrink in size during runtime, unlike fixed-size character arrays.",
        commonMistakes: ["Forgetting to include #include <string>.", "Thinking '==' compares addresses like in some languages (in C++, == compares the text content)."],
        quickTip: "Always use 's.empty()' instead of 's.length() == 0' to check if a string is empty."
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
        theory: "Pointers are variables that store the memory address of another variable. They are the most powerful feature of C++, enabling direct memory manipulation and efficient data handling. Every pointer has a type (like int*) which tells it what kind of data it's pointing to.",
        realLifeExample: "A pointer is like a home address written on a post-it note. It's not the house itself, but it tells you exactly where to go to find the house.",
        examples: [
          { title: "Address-of", code: "int x = 5; int *ptr = &x;", output: "(Pointer points to x)", explanation: "'&' symbol retrieves the location of x in RAM." },
          { title: "Dereferencing", code: "cout << *ptr;", output: "5", explanation: "The '*' symbol 'follows the address' to get the original value." },
          { title: "Nullptr", code: "int *p = nullptr;", output: "(No address)", explanation: "Initialized to a safe empty state to avoid crashes." }
        ],
        practice: { 
          task: "Declare an int pointer 'ptr'.", 
          initialCode: "int main() {\n    // pointer here\n    return 0;\n}",
          requiredKeywords: ["int", "*ptr"], 
          hint: "int *ptr;" 
        },
        didYouKnow: "Pointers were invented in 1964 by Harold Lawson for the language PL/I.",
        commonMistakes: ["Using a pointer that hasn't been assigned an address yet (Wild Pointer).", "Forgetting the '*' during declaration: 'int ptr = &x' is an error."],
        quickTip: "When you see '*', read it as 'Value at'. When you see '&', read it as 'Address of'."
      },
      {
        id: "ptr-arith",
        title: "Pointer Arithmetic",
        theory: "You can perform addition or subtraction on pointers. Since pointers deal with addresses, incrementing a pointer moves it by the size of the data type it points to (e.g., +4 bytes for an int). This allows for fast traversal of lists.",
        realLifeExample: "Pointer arithmetic is like moving to the next apartment in a hallway. If each room is 10 feet wide, 'Room + 1' moves you 10 feet down the hall.",
        examples: [
          { title: "Increment", code: "ptr++;", output: "(Next int address)", explanation: "The pointer now points to the next integer in memory." },
          { title: "A[i] vs *(A+i)", code: "arr[1] is same as *(arr + 1);", output: "(Values matches)", explanation: "Array access is internally just pointer arithmetic." },
          { title: "Distance", code: "int n = ptr2 - ptr1;", output: "(Count of elements)", explanation: "Shows how many objects of a type are between two addresses." }
        ],
        practice: { 
          task: "Increment pointer 'p'.", 
          initialCode: "int main() {\n    int *p;\n    // increment\n    return 0;\n}",
          requiredKeywords: ["p", "++"], 
          hint: "p++;" 
        },
        didYouKnow: "Modern C++ avoids pointer arithmetic in favor of 'Iterators' for better safety.",
        commonMistakes: ["Trying to increment a pointer to a type that has no size (void*).", "Arithmetic that goes beyond the bounds of an array."],
        quickTip: "Use 'p + 1' instead of 'p++' if you don't want to change the original pointer's position permanently."
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
        theory: "Structures are user-defined data types that allow you to group variables of different types under a single name. This is the first step toward complex data modeling to represent real entities like a 'Student' or 'Book'.",
        realLifeExample: "A structure is like a physical ID card. It contains an 'int' (Roll No), a 'string' (Name), and a 'float' (GPA), all belonging to one 'Student'.",
        examples: [
          { title: "Definition", code: "struct User { int id; string name; };", output: "(New type created)", explanation: "Bundles different types together." },
          { title: "Dot Access", code: "User u; u.id = 1;", output: "u.id=1", explanation: "Use the dot ('.') operator to reach individual fields." },
          { title: "Initialization", code: "User u = {1, \"Tak\"};", output: "(Assigned values)", explanation: "Fastest way to prime a struct with data." }
        ],
        practice: { 
          task: "Define struct 'Point' with int 'x'.", 
          initialCode: "// struct Point here\n\nint main() {\n    return 0;\n}",
          requiredKeywords: ["struct", "Point", "int", "x", ";"], 
          hint: "struct Point { int x; };" 
        },
        didYouKnow: "In C++, a struct is identical to a class, except its members are public by default.",
        commonMistakes: ["Forgetting the semicolon (;) at the end of the struct definition.", "Accessing members of a pointer to a struct using '.' (use '->' instead)."],
        quickTip: "Use structs for simple data-only objects and move to classes when you need complex logic."
      },
      {
        id: "unions",
        title: "Unions",
        theory: "Unions are similar to structures but all members share the exact same memory location. Consequently, a union can only hold one of its member values at any given time, making it extremely memory efficient for low-level systems.",
        realLifeExample: "A union is like a shared storage locker. Multiple people have a key, but only one person's coat can fit inside at a time.",
        examples: [
          { title: "Shared Space", code: "union V { int i; char c; };", output: "(Memory shared)", explanation: "Changing one field might alter the others." },
          { title: "Memory Size", code: "cout << sizeof(V);", output: "4 (for int size)", explanation: "A union is only as large as its biggest member." },
          { title: "One-at-a-time", code: "v.i = 10; v.c = 'a'; // v.i is now corrupted", output: "(Data changed)", explanation: "Assigning to 'c' overwrote the space occupied by 'i'." }
        ],
        practice: { 
          task: "Define union 'Value' with int 'i'.", 
          initialCode: "// union Value here\n\nint main() {\n    return 0;\n}",
          requiredKeywords: ["union", "Value", "int"], 
          hint: "union Value { int i; };" 
        },
        didYouKnow: "Unions are used inside the operating system's kernel to handle various types of hardware device information efficiently.",
        commonMistakes: ["Attempting to read from one union member after writing to another.", "Trying to store large strings inside a simple union."],
        quickTip: "Only use unions if your device or system is very low on RAM."
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
        theory: "Classes are the blueprints for creating objects. They encapsulate data (attributes) and functions (methods) into a single unit. This is the heart of OOP, providing data security and enabling modular codes through 'Access Specifiers' like public and private.",
        realLifeExample: "If a 'Car' is a Class, then your specific Toyota or Ford is an 'Object'. The blueprint (Class) says every car must have 'Engine' and 'Wheels', while the Object provides the specific details.",
        examples: [
          { title: "Public Interface", code: "class A { public: void hi() {} };", output: "(Usable class)", explanation: "Everything under public can be accessed from main()." },
          { title: "Private Data", code: "class A { int x; }; // x is private", output: "(Encapsulated)", explanation: "Keeps internal data safe from outside interference." },
          { title: "Instantiation", code: "A obj; obj.hi();", output: "(Calls hi)", explanation: "An object is a living instance of a class." }
        ],
        practice: { 
          task: "Define class 'Home' with public key.", 
          initialCode: "// class here\n\nint main() {\n    return 0;\n}",
          requiredKeywords: ["class", "Home", "public"], 
          hint: "class Home { public: ... };" 
        },
        didYouKnow: "C++ was the first widely used language to bring object-oriented programming to the professional market.",
        commonMistakes: ["Forgetting the semicolon after the closing brace of a class.", "Trying to initialize member variables directly inside the class (unless using C++11 or above)."],
        quickTip: "Always follow the 'Rule of Three' when dealing with custom memory inside classes."
      },
      {
        id: "constructors",
        title: "Constructors & Destructors",
        theory: "A Constructor is a special function called automatically when an object is created. A Destructor is called automatically when it goes out of scope. They ensure objects are initialized smoothly and cleaned up properly to avoid memory leaks.",
        realLifeExample: "A constructor is like a setup crew that prepares a stage before a concert. A destructor is the cleanup crew that packs everything away after the show is over.",
        examples: [
          { title: "Default Cons", code: "A() { cout << \"Hi\"; }", output: "Hi", explanation: "Called the moment 'A obj;' is written." },
          { title: "Param Cons", code: "A(int val) { x = val; }", output: "(Initialized x)", explanation: "Allows providing startup data: 'A obj(5);'" },
          { title: "Destructor", code: "~A() { cout << \"Bye\"; }", output: "Bye", explanation: "Used to free memory or close files when object dies." }
        ],
        practice: { 
          task: "Define a constructor for class 'Main'.", 
          initialCode: "class Main {\npublic:\n    // constructor\n};",
          requiredKeywords: ["Main", "()"], 
          hint: "Main() { ... }" 
        },
        didYouKnow: "If you don't define a constructor, the compiler writes a hidden 'Default Constructor' for you.",
        commonMistakes: ["Trying to give a return type like 'void' to a constructor.", "Defining a constructor in the private section (this makes the class un-instantiable)."],
        quickTip: "Always use 'Member Initializer Lists' in your constructors for faster execution."
      },
      {
        id: "inheritance",
        title: "Inheritance Types",
        theory: "Inheritance allows a new class (child) to inherit the features of an existing class (parent). This promotes code reuse and hierarchical organization. C++ supports types like Single, Multiple, and Multilevel inheritance.",
        realLifeExample: "Inheritance is like genetic traits. A Child inherits features from a Parent class, but can also have its own unique skills.",
        examples: [
          { title: "Single", code: "class B : public A {};", output: "(Inherits A)", explanation: "B now has all features that were public in A." },
          { title: "Multiple", code: "class C : public A, public B {};", output: "(Inherits 2)", explanation: "A child class with two distinct parents." },
          { title: "Multilevel", code: "class C : public B {}; // B inhs A", output: "(Grandchild)", explanation: "traits passed down through multiple generations." }
        ],
        practice: { 
          task: "Inherit class 'B' from 'A' publicly.", 
          initialCode: "class A {};\n// inherit B here\n\nint main() {\n    return 0;\n}",
          requiredKeywords: ["class", "B", "public", "A"], 
          hint: "class B : public A { ... };" 
        },
        didYouKnow: "C++ is one of the few languages that allows 'Multiple Inheritance'. Many others avoid it to keep things simple.",
        commonMistakes: ["Using private inheritance incorrectly, which locks features away from grandchildren.", "Forgetting the colon (:) syntax for deriving."],
        quickTip: "Always use 'Is-a' logic. A Dog 'is-a' Animal, so Dog should inherit from Animal."
      },
      {
        id: "polymorphism",
        title: "Polymorphism (Overloading)",
        theory: "Polymorphism means 'many forms'. Function overloading is a compile-time polymorphism where multiple functions have the same name but different parameters. This makes your code more intuitive.",
        realLifeExample: "The word 'Cut' is polymorphic. To a barber, it means hair; to a chef, it means veggies; to a director, it means stopping the scene.",
        examples: [
          { title: "Func Overload", code: "void f(int); void f(double);", output: "(Different paths)", explanation: "Compiler picks based on the data type passed." },
          { title: "Operator Overload", code: "Box operator+(Box b);", output: "(Custom addition)", explanation: "Allows you to 'add' two objects using the '+' sign." },
          { title: "C-Polymorphism", code: "Shape s; s.draw();", output: "(Correct shape drawn)", explanation: "The same command behaves differently based on object state." }
        ],
        practice: { 
          task: "Overload function 'print' with int and char.", 
          initialCode: "int main() {\n    // print(int) and print(char)\n}",
          requiredKeywords: ["void", "print", "int", "char"], 
          hint: "void print(int n); void print(char c);" 
        },
        didYouKnow: "Polymorphism was a relatively rare feature in programming before C++ brought it into the mainstream industry.",
        commonMistakes: ["Overloading based only on return type (not allowed).", "Confusing overloading with overriding (the latter needs inheritance)."],
        quickTip: "Use polymorphism to keep your function names clean and consistent."
      },
      {
        id: "virtual-func",
        title: "Virtual Functions",
        theory: "Virtual functions enable runtime polymorphism. They ensure the correct derived version is called even through a base pointer. This is the cornerstone of building extensible systems and frameworks.",
        realLifeExample: "Imagine a 'Speak' button on a toy. If the toy is a Dog, it barks; if it's a Cat, it meows. The specific sound depends on what the toy actually is at runtime.",
        examples: [
          { title: "Definition", code: "virtual void show() = 0;", output: "(Pure virtual)", explanation: "Marks a class as 'Abstract' meaning no objects can be made from it." },
          { title: "Late Binding", code: "Base *b = new Derived(); b->run();", output: "(Derived run called)", explanation: "The code to run is decided while the app is running, not while compiling." },
          { title: "Override", code: "void run() override { ... }", output: "(Replacement logic)", explanation: "Keyword to ensure you are correctly replacing a base function." }
        ],
        practice: { 
          task: "Use 'virtual' for function 'play'.", 
          initialCode: "class Game {\npublic:\n    // virtual play here\n};",
          requiredKeywords: ["virtual", "void", "play"], 
          hint: "virtual void play() { ... }" 
        },
        didYouKnow: "Every class with a virtual function has a hidden 'V-Table' used to look up addresses at runtime.",
        commonMistakes: ["Forgetting 'virtual' in the base class.", "Calling virtual functions from a constructor (doesn't work as expected)."],
        quickTip: "Always make your destructor virtual if you have virtual functions."
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
        theory: "File handling allows your program to store data permanently on a disk using streams. This is essential for saving configurations, user logs, or data reports that must survive after the program closes.",
        realLifeExample: "File handling is like a filing cabinet. Writing is like filling out a form and filing it. Reading is like picking up the form later to see what was written.",
        examples: [
          { title: "Writing", code: "ofstream f(\"hi.txt\"); f << \"Hi\";", output: "(File created)", explanation: "Uses ofstream (output file stream) to write data." },
          { title: "Reading", code: "ifstream f(\"hi.txt\"); string s; f >> s;", output: "Hi", explanation: "Uses ifstream (input file stream) to pull data into variables." },
          { title: "Closing", code: "f.close();", output: "(File saved)", explanation: "Closing a file flushes buffers and saves the data securely." }
        ],
        practice: { 
          task: "Use 'ofstream' to open 'test.txt'.", 
          initialCode: "#include <fstream>\nusing namespace std;\n\nint main() {\n    // ofstream here\n    return 0;\n}",
          requiredKeywords: ["ofstream", "test.txt"], 
          hint: "ofstream f(\"test.txt\");" 
        },
        didYouKnow: "C++ can also handle 'Binary Files' which store data exactly as it is in memory, making them extremely fast.",
        commonMistakes: ["Forgetting to close the file, leading to memory leaks or data corruption.", "Trying to read a file that doesn't exist without checking 'f.is_open()'."],
        quickTip: "Always use the 'is_open()' check to ensure your file operations succeed."
      },
      {
        id: "exceptions",
        title: "Exception Handling",
        theory: "Exception handling allows a program to deal with unexpected runtime errors without crashing. Using 'try', 'throw', and 'catch', you can make your apps resilient and safe.",
        realLifeExample: "Exception handling is like a circus safety net. You 'try' to perform the stunt; if you fall (error), the net 'catches' you so the show continues.",
        examples: [
          { title: "Catching Error", code: "try { throw 404; } catch(int e) { ... }", output: "(Error Handled)", explanation: "The program jumps directly to the catch block when throw occurs." },
          { title: "Division by Zero", code: "if(y==0) throw \"Zero\";", output: "Zero", explanation: "Ensures dangerous math doesn't crash the engine." },
          { title: "Catch All", code: "catch(...) { ... }", output: "(General Error)", explanation: "Will catch any exception, useful as a last safety net." }
        ],
        practice: { 
          task: "Write a try-catch block.", 
          initialCode: "int main() {\n    // try catch\n    return 0;\n}",
          requiredKeywords: ["try", "catch"], 
          hint: "try { ... } catch(...) { ... }" 
        },
        didYouKnow: "Modern C++ best practices say 'Throw by Value, Catch by Reference' for best performance.",
        commonMistakes: ["Using exceptions for normal code flow (it's slow!).", "Throwing exceptions from destructors (this can cause double-termination crashes)."],
        quickTip: "Only use exception handling for truly exceptional cases that you can't prevent with a simple 'if' check."
      },
      {
        id: "templates",
        title: "Templates",
        theory: "Templates allow you to write 'Generic Code' that works for any data type. You define a function or class once using placeholders, and the compiler generates the code for you.",
        realLifeExample: "A template is like a stencil. You have one stencil (the code), but you can use different colors of paint (data types) to create the same shape.",
        examples: [
          { title: "Func Template", code: "template <typename T> void f(T x);", output: "(Generic Function)", explanation: "One function can now print an int, a float, or a string." },
          { title: "Template Class", code: "template <class T> class Box { T x; };", output: "(Reusable Class)", explanation: "Allows you to create a Box of any data type easily." },
          { title: "Specialization", code: "template <> class Box<int> { ... };", output: "(Specific code)", explanation: "Define unique logic for specific types if needed." }
        ],
        practice: { 
          task: "Use 'template' and 'typename' keywords.", 
          initialCode: "// template here\n\nint main() {\n    return 0;\n}",
          requiredKeywords: ["template", "typename"], 
          hint: "template <typename T> void f(T x);" 
        },
        didYouKnow: "C++ Templates are 'Turing Complete', meaning the compiler can actually solve any logical problem while building the code.",
        commonMistakes: ["Creating templates that are too generic and don't work with certain types.", "Misplacing the template definition in a separate .cpp file."],
        quickTip: "Mastering templates is the first step to understanding the powerful C++ STL library."
      }
    ]
  }
];

window.cppCurriculum = cppCurriculum;
