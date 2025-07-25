use wasm_bindgen::prelude::*;
use strsim::jaro;
use comparison::ComparisonGenerator;

mod comparison;

#[wasm_bindgen]
extern "C" {
    pub fn alert(s: &str);
}

#[wasm_bindgen]
pub fn greet(name: &str) {
    alert(&format!("Hello, {}!", name));
}

#[wasm_bindgen]
pub fn compare_string_simple(a: &str, b: &str) -> f64 {
    jaro(a, b)
}

#[wasm_bindgen]
pub fn compare_strings(a: &str, b: &str) -> f64 {
    let cg = ComparisonGenerator::new();
    cg.cosine_similarity(a, b)
}



#[cfg(test)]
mod tests {
    use super::{compare_string_simple, compare_strings};

    #[test]
    fn test_compare_string_simple() {
        assert_eq!(compare_string_simple("hello", "hello"), 1.0);
    }

    #[test]
    fn test_compare_strings() {
        println!("{}", compare_strings("I have chosen to write a few words here. REI There is nothing really like the sustainability of REI and their mission to protect the environment.", "I have chosen to write more words here. I really appreciate the environmental impact that Patagonia understands, and their mission to lower greenhouse emissions."));
    }

}