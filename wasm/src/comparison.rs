use std::collections::HashSet;
use regex::Regex;
use std::collections::HashMap;

fn get_english_stop_words() -> HashSet<String> {
    let stop_words = vec![
        "i", "me", "my", "myself", "we", "our", "ours", "ourselves", "you", "your", "yours",
        "yourself", "yourselves", "he", "him", "his", "himself", "she", "her", "hers",
        "herself", "it", "its", "itself", "they", "them", "their", "theirs", "themselves",
        "what", "which", "who", "whom", "this", "that", "these", "those", "am", "is", "are",
        "was", "were", "be", "been", "being", "have", "has", "had", "having", "do", "does",
        "did", "doing", "a", "an", "the", "and", "but", "if", "or", "because", "as", "until",
        "while", "of", "at", "by", "for", "with", "through", "during", "before", "after",
        "above", "below", "up", "down", "in", "out", "on", "off", "over", "under", "again",
        "further", "then", "once"
    ];
    
    stop_words.iter().map(|s| s.to_string()).collect()
}


pub struct ComparisonGenerator {
    pub stop_words: HashSet<String>,
    pub re: Regex
}
impl ComparisonGenerator {
    pub fn new() -> Self {
        ComparisonGenerator {
            stop_words: get_english_stop_words(),
            re: Regex::new(r"[^A-Za-z\s]").unwrap()
        }
    }

    fn remove_stop_words(&self, text: &str) -> Vec<String> {
        let cleaned = self.re.replace_all(text, " "); //remove non-alphabetic terms
        let words: Vec<String> = cleaned
            .to_lowercase()
            .split_whitespace()
            .filter(|word| !self.stop_words.contains(*word))
            .map(|s| s.to_string())
            .collect();
        words
    }

    fn compute_tfidf(&self, document: &[String], corpus: &[&[String]]) -> HashMap<String, f64> {
        let mut tf_map = HashMap::new();
        let doc_length = document.len() as f64;
        
        // Calculate term frequency
        for word in document {
            let count = tf_map.entry(word.clone()).or_insert(0.0);
            *count += 1.0;
        }
        
        for (_, count) in tf_map.iter_mut() {
            *count /= doc_length;
        }
        
        let corpus_size = corpus.len() as f64;
        let mut tfidf_map = HashMap::new();
        
        for (word, tf) in tf_map {
            let df = corpus.iter()
                .filter(|doc| doc.contains(&word))
                .count() as f64;
            
            let idf = (corpus_size / df).ln();
            tfidf_map.insert(word, tf * idf);
        }
        
        tfidf_map
    }

    fn calculate_cosine_similarity(&self, vec1: &HashMap<String, f64>, vec2: &HashMap<String, f64>) -> f64 {
        let mut dot_product = 0.0;
        let mut norm1 = 0.0;
        let mut norm2 = 0.0;
        
        // Get all unique words from both vectors
        let mut all_words: HashSet<&String> = HashSet::new();
        all_words.extend(vec1.keys());
        all_words.extend(vec2.keys());

        
        for word in all_words {
            let val1 = vec1.get(word).unwrap_or(&0.0);
            let val2 = vec2.get(word).unwrap_or(&0.0);
            
            dot_product += val1 * val2;
            norm1 += val1 * val1;
            norm2 += val2 * val2;
        }
        
        if norm1 == 0.0 || norm2 == 0.0 {
            0.0
        } else {
            dot_product / (norm1.sqrt() * norm2.sqrt())
        }
    }

    pub fn cosine_similarity(&self, text1: &str, text2: &str) -> f64 {
        let processed_text1 = self.remove_stop_words(text1);
        let processed_text2 = self.remove_stop_words(text2);
        
        let tfidf1 = self.compute_tfidf(&processed_text1, &[&processed_text1, &processed_text2]);
        let tfidf2 = self.compute_tfidf(&processed_text2, &[&processed_text1, &processed_text2]);
        
        self.calculate_cosine_similarity(&tfidf1, &tfidf2)
    }
}