#!/usr/bin/perl -w
#
#  Test that our output is validatored
#
# Steve
# --


use File::Find;
use HTML::Lint;
use Test::More;

#
#  Basically this test validates the HTML which would be produced if
# a blog is compiled - if one is not present then we have nothing to
# validate against.
#

if (  -d "./output/" )
{
    plan  no_plan;
}
else
{
    plan skip_all => 'There is no output directory to validate against!';
    exit;
}

#
#  Find all the files beneath the current directory,
# and call 'checkFile' with the name.
#
find( { wanted => \&checkFile, no_chdir => 1 }, './output/' );



#
#  Check a file.
#
#
sub checkFile
{
    # The file.
    my $file = $File::Find::name;

    # We don't care about directories
    return if ( ! -f $file );

    #  We only care about html files.
    return if ( $file !~ /\.html$/ );

    my $lint = HTML::Lint->new;

    $lint->parse_file( $file );

    my $error_count = $lint->errors;

    foreach my $error ( $lint->errors ) {
        if ( $error->as_string =~ /<cut>/ )
        {
            $error_count -= 1;
        }
        #print $error->as_string, "\n";
    }

    is( $error_count, 0 , "There are no errors in $file" );
}



#
#  Count and return the number of literal TAB characters contained
# in the specified file.
#
sub countTabCharacters
{
    my ( $file ) = (@_);
    my $count = 0;

    open( FILE, "<", $file )
      or die "Cannot open $file - $!";
    foreach my $line ( <FILE> )
    {
        # We will count multiple tab characters in a single line.
        while( $line =~ /(.*)\t(.*)/ )
        {
            $count += 1;
            $line = $1 . $2;
        }
    }
    close( FILE );

    return( $count );
}
