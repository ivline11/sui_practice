/*
/// Module: hello_world
module hello_world::hello_world;
*/

module hello_world::hello_world;

//use package::module::function 
use std::string::String;

public fun hello_world(): String {
    b"Hello, World!".to_string()
}
