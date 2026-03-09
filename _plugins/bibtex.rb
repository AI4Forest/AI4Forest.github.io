require 'bibtex-ruby'
require 'citeproc'
require 'csl/styles'

module Jekyll
  class Bibtex < Generator
    safe true
    priority :high

    def generate(site)
      Jekyll.logger.info "Starting BibTeX generator..."
      Jekyll.logger.info "Current directory: #{Dir.pwd}"
      Jekyll.logger.info "Site source: #{site.source}"
      
      bib_path = File.join(site.source, '_bibliography', 'papers.bib')
      Jekyll.logger.info "Looking for BibTeX file at: #{bib_path}"
      
      unless File.exist?(bib_path)
        Jekyll.logger.error "BibTeX file not found at: #{bib_path}"
        return
      end
      
      begin
        bib = BibTeX.open(bib_path)
        Jekyll.logger.info "Successfully opened BibTeX file"
        Jekyll.logger.info "Found #{bib.length} entries"
        
        publications = []
        
        bib.each do |entry|
          Jekyll.logger.info "Processing entry: #{entry.key}"
          next unless entry.complete? && ['article', 'inproceedings', 'misc'].include?(entry.type.to_s)
          
          # Convert authors to array of hashes
          authors = entry.author.to_s.split(' and ').map do |author|
            parts = author.strip.split(',')
            if parts.size > 1
              { 'first' => parts[1].strip, 'last' => parts[0].strip }
            else
              { 'first' => parts[0].strip, 'last' => '' }
            end
          end
          
          # Create publication hash (journal for articles, booktitle for inproceedings, howpublished/publisher for misc)
          venue = case entry.type.to_s
                  when 'inproceedings' then entry.booktitle.to_s
                  when 'misc' then [entry.journal, entry.howpublished, entry.publisher, entry.number].compact.map(&:to_s).find { |s| !s.strip.empty? } || ''
                  else entry.journal.to_s
                  end
          pub = {
            'key' => entry.key,
            'title' => entry.title.to_s,
            'author_array' => authors,
            'journal' => venue,
            'year' => entry.year.to_s,
            'month' => entry.month.to_s,
            'abstract' => entry.abstract.to_s,
            'doi' => entry.doi.to_s,
            'url' => entry.url.to_s,
            'pdf' => entry.url.to_s,
            'html' => entry.url.to_s,
            'arxiv' => entry.arxiv.to_s,
            'supp' => entry.supp.to_s,
            'blog' => entry.blog.to_s,
            'code' => entry.code.to_s,
            'poster' => entry.poster.to_s,
            'slides' => entry.slides.to_s,
            'website' => entry.website.to_s,
            'note' => entry.note.to_s,
            'bibtex_show' => true
          }
          
          publications << pub
        end
        
        # Sort publications by year (newest first)
        publications.sort_by! { |pub| -pub['year'].to_i }
        
        # Add publications to site data
        site.data['publications'] = publications
        Jekyll.logger.info "Successfully processed #{publications.size} publications"
        
      rescue => e
        Jekyll.logger.error "Error processing BibTeX file: #{e.message}"
        Jekyll.logger.error e.backtrace.join("\n")
      end
    end
  end
end 